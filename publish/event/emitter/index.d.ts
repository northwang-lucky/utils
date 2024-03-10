import type { EventCallback } from './types';
export declare class EventEmitter {
    private callbacksRecord;
    on(eventName: string, callback: EventCallback['callback']): void;
}
