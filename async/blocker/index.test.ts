import { expect, test } from 'vitest';
import { Blocker } from '.';

test('Blocker without return value', async () => {
  const blocker = new Blocker();
  let count = 0;
  const timer = setInterval(() => {
    expect(blocker.pending).toBe(true);
    count += 1;
    if (count >= 2) {
      clearInterval(timer);
      blocker.off();
    }
  }, 1000);
  await blocker.on();
  expect(blocker.pending).toBe(false);
});

test('Blocker with return value', async () => {
  const blocker = new Blocker<string>();
  let count = 0;
  const timer = setInterval(() => {
    expect(blocker.pending).toBe(true);
    count += 1;
    if (count >= 2) {
      clearInterval(timer);
      blocker.off('success');
    }
  }, 1000);
  const msg = await blocker.on();
  expect(blocker.pending).toBe(false);
  expect(msg).toBe('success');
});
