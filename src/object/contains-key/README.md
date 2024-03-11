[Back Home](/README.md)

## Function

### containsKey()

#### containsKey(obj, key)

> **containsKey**(`obj`, `key`): `boolean`

It only judges whether the object itself contains the passed-in key, not on the prototype chain.

##### Parameters

• **obj**: `object`

An object

• **key**: `string`

A key whether is contained by the object or not

##### Returns

`boolean`

Is the object contains the key

##### Example

```ts
import { containsKey } from '@norwa/utils/object/contains-key'

const obj = { a: 1 }
containsKey(obj, 'a') // echo true
containsKey<{ a: number; b?: string }>(obj, 'b') // echo false
```

#### containsKey(obj, key)

> **containsKey**\<`T`\>(`obj`, `key`): `boolean`

##### Type parameters

• **T**

##### Parameters

• **obj**: `T`

• **key**: keyof `T`

##### Returns

`boolean`
