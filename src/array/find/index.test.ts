import { expect, test } from 'vitest';
import { find } from '.';

test('Find a number that is less then zero', () => {
  const num = find([-1, 0, 1], n => n < 0);
  expect(num).toBeLessThan(0);
});

test('Find nothing', () => {
  const num = find([-1, 0, 1], n => n > 1);
  expect(num).toBeUndefined();
});
