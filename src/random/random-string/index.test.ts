import { assert, expect, test } from 'vitest';
import { randomString } from '.';

test('A random string whose length is 6', () => {
  const str = randomString(6);
  expect(str.length).toBe(6);
});

test('A random string with charset', () => {
  const str = randomString(6, { charset: '123456789' });
  expect(/[1-9]{6}/.test(str)).toBe(true);
});

test('A random string that has removed confusion', () => {
  const str = randomString(36, {
    charset: 'iIlL1oO0',
    removeConfusion: true,
  });
  assert.isEmpty(str);
});
