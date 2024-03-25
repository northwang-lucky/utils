[Back Home](/README.md)

## Function

### compare()

> **compare**\<`T`\>(`A`, `B`, `opts`): `Object`

Compare array B with array A, and returns differences.

#### Type parameters

• **T**

#### Parameters

• **A**: `T`[]

Array A

• **B**: `T`[]

Array B

• **opts**= `{}`

Optional params

• **opts\.isEqual?**

Implement your custom way to judge wether the two elements are equal.

#### Returns

`Object`

The extra elements, unchanged elements, removed elements, length difference and absolute value of array B compared with array A.

##### added

> **added**: `T`[]

##### lenDiff

> **lenDiff**: `number`

##### lenDiffAbs

> **lenDiffAbs**: `number`

##### removed

> **removed**: `T`[]

##### unchanged

> **unchanged**: `T`[]

#### Example

```ts
import { compare } from '@norwa/utils/array/compare'

const a = [1, 2, 3]
const b = [2, 4]
const {
  added,     // [4]
  unchanged, // [2]
  removed,   // [1]
  lenDiff,   // -1
  lenDiffAbs // 1
} = compare(a, b)
```
