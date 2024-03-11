[Back Home](/README.md)

## Function

### randomString()

> **randomString**(`len`, `opts`): `string`

Generate a random string.

#### Parameters

• **len**: `number`

Length of string

• **opts**= `{}`

Optional parameters

• **opts\.charset?**: `string`

The character set used to generate the string

• **opts\.removeConfusion?**: `boolean`

If it is set to true, "iIlL1oO0" will be removed from `charset`

#### Returns

`string`

A random string

#### Example

```ts
randomString(6)
randomString(6, { charset: '1234567890' })
randomString(6, { removeConfusion: true })
```
