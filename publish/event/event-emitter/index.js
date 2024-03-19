import { find } from '../../array/find';
import { containsKey } from '../../object/contains-key';
import { randomString } from '../../random/random-string';
/**
 * This is an event emitter.
 * Implemented with "Publish Subscribe Mode".
 *
 * @example
 * ```ts
 * import { EventEmitter } from '@norwa/utils/event/event-emitter'
 *
 * const eventEmitter = new EventEmitter()
 * let callbackId: string | undefined
 * const callback = (msg: string) => {
 *   console.log(msg) // output: hello
 *   if (callbackId) {
 *     eventEmitter.off('sayHello', callbackId)
 *   } else {
 *     eventEmitter.off('sayHello', callback)
 *   }
 * }
 * callbackId = eventEmitter.on('sayHello', callback)
 * eventEmitter.emit('sayHello', 'hello')
 * // Or emit one of callbacks by id
 * eventEmitter.emitById('sayHello', callbackId, 'hello')
 * ```
 *
 * @public
 *
 */
export class EventEmitter {
    constructor() {
        this.callbackRecord = {};
    }
    /**
     * Subscribe an event
     * @param eventName - Event name
     * @param callback - Callback function
     * @returns Callback id
     */
    on(eventName, callback) {
        if (!containsKey(this.callbackRecord, eventName)) {
            this.callbackRecord[eventName] = [];
        }
        const eventCallback = find(this.callbackRecord[eventName], evcb => evcb.callback === callback);
        if (eventCallback && !eventCallback.removed) {
            return eventCallback.id;
        }
        const id = randomString(16);
        this.callbackRecord[eventName].push({ id, removed: false, callback });
        return id;
    }
    off(eventName, selector) {
        if (!containsKey(this.callbackRecord, eventName)) {
            return;
        }
        const eventCallback = find(this.callbackRecord[eventName], evcb => {
            if (typeof selector === 'string') {
                return evcb.id === selector;
            }
            else {
                return evcb.callback === selector;
            }
        });
        if (!eventCallback || eventCallback.removed) {
            return;
        }
        eventCallback.removed = true;
    }
    /**
     * Emit all callbacks of the event
     * @param eventName - Event name
     * @param args - Arguments
     */
    emit(eventName, ...args) {
        this.execCallbacks(eventName, args);
    }
    /**
     * Emit one of callbacks of the event by callback id
     * @param eventName - Event name
     * @param id - Callback id
     * @param args - Arguments
     */
    emitById(eventName, id, ...args) {
        this.execCallbacks(eventName, args, evcb => evcb.id === id);
    }
    execCallbacks(eventName, args, selector) {
        if (!containsKey(this.callbackRecord, eventName)) {
            return;
        }
        const eventCallbacks = this.callbackRecord[eventName];
        for (let i = 0; i < eventCallbacks.length; i++) {
            const eventCallback = eventCallbacks[i];
            if (eventCallback.removed) {
                continue;
            }
            if (selector && selector(eventCallback, i)) {
                eventCallback.callback(...args);
                break;
            }
            eventCallback.callback(...args);
        }
    }
}
