import { expect, test } from 'vitest';
import { includes } from '.';

test('Includes', () => {
  const arr = [1, 2, 3];
  expect(includes(arr, 1)).toBe(true);
});

test('Not includes', () => {
  const arr = [1, 2, 3];
  expect(includes(arr, 0)).toBe(false);
});
