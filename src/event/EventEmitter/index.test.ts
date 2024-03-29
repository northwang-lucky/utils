import { expect, test } from 'vitest';
import { EventEmitter } from '.';

const EVENT_NAME = 'say_hello';
const MESSAGE = 'hello';

test('Common usage', () => {
  const eventEmitter = new EventEmitter();

  let count = 0;
  const callback = (msg: string): void => {
    count += 1;
    eventEmitter.off(EVENT_NAME, callback);
    expect(msg).toBe(MESSAGE);
  };
  eventEmitter.on(EVENT_NAME, callback);
  eventEmitter.emit(EVENT_NAME, MESSAGE);
  eventEmitter.emit(EVENT_NAME, MESSAGE);
  expect(count).toBe(1);

  let callbackId: string | undefined = undefined;
  const callback2 = (msg: string): void => {
    count += 1;
    if (callbackId) {
      eventEmitter.off(EVENT_NAME, callbackId);
    }
    expect(msg).toBe(MESSAGE);
  };
  callbackId = eventEmitter.on(EVENT_NAME, callback2);
  eventEmitter.emitById(EVENT_NAME, callbackId, MESSAGE);
  expect(count).toBe(2);
});

test('Wrong usage', () => {
  const eventEmitter = new EventEmitter();
  const callback = (): void => void 0;
  eventEmitter.emit(EVENT_NAME, MESSAGE);
  eventEmitter.off(EVENT_NAME, callback);
  eventEmitter.on(EVENT_NAME, callback);
  eventEmitter.off(EVENT_NAME, callback);
  eventEmitter.off(EVENT_NAME, callback);
});

test('Callback existed', () => {
  const eventEmitter = new EventEmitter();
  const callback = (): void => void 0;
  const idA = eventEmitter.on(EVENT_NAME, callback);
  const idB = eventEmitter.on(EVENT_NAME, callback);
  expect(idA).toBe(idB);
});
