import { expect, test } from 'vitest';
import { containsKey } from '.';

test('Object contains key', () => {
  type Obj = {
    a: number;
    b?: string;
  };

  const obj: Obj = {
    a: 1,
  };

  expect(containsKey<Obj>(obj, 'a')).toBe(true);
  expect(containsKey<Obj>(obj, 'b')).toBe(false);
});
