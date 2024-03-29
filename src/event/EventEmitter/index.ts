import { find } from '../../array/find';
import { containsKey } from '../../object/containsKey';
import { randomString } from '../../random/randomString';
import { CallbackFn, EventCallback } from './types';

/**
 * This is an event emitter.
 * Implemented with "Publish Subscribe Mode".
 *
 * @example
 * ```ts
 * import { EventEmitter } from '@norwa/utils/event/EventEmitter'
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
  private callbackRecord: Record<string, EventCallback[]> = {};

  /**
   * Subscribe an event
   * @param eventName - Event name
   * @param callback - Callback function
   * @returns Callback id
   */
  on(eventName: string, callback: CallbackFn): string {
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
  off(eventName: string, selector: string | CallbackFn): void {
    if (!containsKey(this.callbackRecord, eventName)) {
      return;
    }

    const eventCallback = find(this.callbackRecord[eventName], evcb => {
      if (typeof selector === 'string') {
        return evcb.id === selector;
      } else {
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
  emit(eventName: string, ...args: Parameters<CallbackFn>): void {
    this.execCallbacks(eventName, args);
  }

  /**
   * Emit one of callbacks of the event by callback id
   * @param eventName - Event name
   * @param id - Callback id
   * @param args - Arguments
   */
  emitById(eventName: string, id: string, ...args: Parameters<CallbackFn>): void {
    this.execCallbacks(eventName, args, evcb => evcb.id === id);
  }

  private execCallbacks(
    eventName: string,
    args: Parameters<CallbackFn>,
    selector?: (evcb: EventCallback, index: number) => boolean
  ): void {
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
