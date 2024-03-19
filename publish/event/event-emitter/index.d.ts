import { CallbackFn } from './types';
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
export declare class EventEmitter {
    private callbackRecord;
    /**
     * Subscribe an event
     * @param eventName - Event name
     * @param callback - Callback function
     * @returns Callback id
     */
    on(eventName: string, callback: CallbackFn): string;
    /**
     * Unsubscribe an event by callback function
     * @param eventName - Event name
     * @param callback - callback function
     */
    off(eventName: string, callback: CallbackFn): void;
    /**
     * Unsubscribe an event by callback id
     * @param eventName - Event name
     * @param id - Callback id
     */
    off(eventName: string, id: string): void;
    /**
     * Emit all callbacks of the event
     * @param eventName - Event name
     * @param args - Arguments
     */
    emit(eventName: string, ...args: Parameters<CallbackFn>): void;
    /**
     * Emit one of callbacks of the event by callback id
     * @param eventName - Event name
     * @param id - Callback id
     * @param args - Arguments
     */
    emitById(eventName: string, id: string, ...args: Parameters<CallbackFn>): void;
    private execCallbacks;
}
