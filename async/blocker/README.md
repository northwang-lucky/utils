

## Class

---

### Blocker

**kind**: Class

This is a process blocker, whose role as it's name. Implemented by `Promise`.

**signature**:

```ts
export declare class Blocker<T = undefined> 
```

**example**: 
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

#### off

**kind**: Method

Stop the blocker

**params**:

- *param* value?: `T` A value that `on()` will receive

**signature**:

```ts
off(value?: T): void;
```

#### on

**kind**: Method

Start the blocker

**returns**:  A value from `off(value: T)`

**signature**:

```ts
on(): Promise<T | undefined>;
```

#### pending

**kind**: Property

Get whether it is pending or not

**signature**:

```ts
get pending(): boolean;
```



