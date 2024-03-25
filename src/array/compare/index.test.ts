import { expect, test } from 'vitest';
import { compare } from '.';

test('Compare basic elements', () => {
  const a = [1, 2, 3];
  const b = [2, 4];
  const { added, unchanged, removed, lenDiff, lenDiffAbs } = compare(a, b);
  expect(added[0]).toBe(4);
  expect(unchanged[0]).toBe(2);
  expect(removed[0]).toBe(1);
  expect(lenDiff).toBe(-1);
  expect(lenDiffAbs).toBe(1);
});

test('Compare complex elements', () => {
  const a = [{ n: 1 }, { n: 2 }, { n: 3 }];
  const b = [{ n: 2 }, { n: 4 }];
  const { added, unchanged, removed, lenDiff, lenDiffAbs } = compare(a, b, {
    isEqual: (a, b) => a.n === b.n,
  });
  expect(added[0].n).toBe(4);
  expect(unchanged[0].n).toBe(2);
  expect(removed[0].n).toBe(1);
  expect(lenDiff).toBe(-1);
  expect(lenDiffAbs).toBe(1);
});
