[Back Home](/README.md)

## Function

### find()

> **find**\<`T`\>(`arr`, `callback`): `T` \| `undefined`

Find a target value by callback.

#### Type parameters

• **T**

#### Parameters

• **arr**: `T`[]

Target array

• **callback**

Search callback

#### Returns

`T` \| `undefined`

A target value or `undefined`

#### Example

```ts
import { find } from '@norwa/utils/array/find'

[1, 2, 3].find(n => n < 0) // output: false
[{ n: 1 }, { n: 2 }, { n: 3 }].find(it => it.n === 2) // output: true
```
