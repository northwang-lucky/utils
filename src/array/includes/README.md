[Back Home](/README.md)

## Function

### includes()

> **includes**\<`T`\>(`arr`, `target`): `boolean`

Find a target element whether included in the array or not.

#### Type parameters

• **T**

#### Parameters

• **arr**: `T`[]

Array to search from

• **target**: `T`

Element to search

#### Returns

`boolean`

Is it included in `arr`

#### Example

```ts
import { includes } from '@norwa/utils/array/includes'

includes([1, 2, 3], 1) // out: true
includes([1, 2, 3], 0) // out: false
```
