import { expect, test } from 'vitest';
import { delay } from '.';

test('Delay', async () => {
  const before = Date.now();
  await delay(200);
  const diff = Date.now() - before;
  expect(diff).toBeGreaterThanOrEqual(200);
});
