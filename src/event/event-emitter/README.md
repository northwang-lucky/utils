[Back Home](/README.md)

## Class

### EventEmitter

This is an event emitter.
Implemented with "Publish Subscribe Mode".

#### Example

```ts
import { EventEmitter } from '@norwa/utils/event/event-emitter'

const eventEmitter = new EventEmitter()
let callbackId: string | undefined
const callback = (msg: string) => {
  console.log(msg) // output: hello
  if (callbackId) {
    eventEmitter.off('sayHello', callbackId)
  } else {
    eventEmitter.off('sayHello', callback)
  }
}
callbackId = eventEmitter.on('sayHello', callback)
eventEmitter.emit('sayHello', 'hello')
// Or emit one of callbacks by id
eventEmitter.emitById('sayHello', callbackId, 'hello')
```

#### Constructors

##### new EventEmitter()

> **new EventEmitter**(): [`EventEmitter`](README.md#eventemitter)

###### Returns

[`EventEmitter`](README.md#eventemitter)

#### Methods

##### emit()

> **emit**(`eventName`, ...`args`): `void`

Emit all callbacks of the event

###### Parameters

• **eventName**: `string`

Event name

• ...**args**: `any`[]

Arguments

###### Returns

`void`

##### emitById()

> **emitById**(`eventName`, `id`, ...`args`): `void`

Emit one of callbacks of the event by callback id

###### Parameters

• **eventName**: `string`

Event name

• **id**: `string`

Callback id

• ...**args**: `any`[]

Arguments

###### Returns

`void`

##### off()

###### off(eventName, callback)

> **off**(`eventName`, `callback`): `void`

Unsubscribe an event by callback function

###### Parameters

• **eventName**: `string`

Event name

• **callback**: `CallbackFn`

callback function

###### Returns

`void`

###### off(eventName, id)

> **off**(`eventName`, `id`): `void`

Unsubscribe an event by callback id

###### Parameters

• **eventName**: `string`

Event name

• **id**: `string`

Callback id

###### Returns

`void`

##### on()

> **on**(`eventName`, `callback`): `string`

Subscribe an event

###### Parameters

• **eventName**: `string`

Event name

• **callback**: `CallbackFn`

Callback function

###### Returns

`string`

Callback id
