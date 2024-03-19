[Back Home](/README.md)

## Class

### Blocker\<T\>

This is a process blocker, whose role as it's name.
Implemented by Promise.

#### Example

```ts
import { Blocker } from '@norwa/utils/async/blocker'

// without return value
const blocker = new Blocker()
setTimeout(() => {
  blocker.off()
}, 1000)
await blocker.on()

// with return value
const blocker = new Blocker<string>()
setTimeout(() => {
  blocker.off('ok')
}, 1000)
const msg = await blocker.on() // msg: ok
```

#### Type parameters

• **T** = `undefined`

#### Constructors

##### new Blocker()

> **new Blocker**\<`T`\>(): [`Blocker`](README.md#blockert)\<`T`\>

###### Returns

[`Blocker`](README.md#blockert)\<`T`\>

#### Accessors

##### pending

> **`get`** **pending**(): `boolean`

Get whether it is pending or not

###### Returns

`boolean`

#### Methods

##### off()

> **off**(`value`?): `void`

Stop the blocker

###### Parameters

• **value?**: `T`

A value that `on()` will receive

###### Returns

`void`

##### on()

> **on**(): `Promise`\<`undefined` \| `T`\>

Start the blocker

###### Returns

`Promise`\<`undefined` \| `T`\>

A value from `off(value: T)`
