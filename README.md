# Cache

[![npm](https://img.shields.io/npm/v/@plaindb/cache?style=flat&logo=npm)](https://www.npmjs.com/package/@plaindb/cache)
[![pipeline](https://gitlab.com/frenware/framework/plaindb/cache/badges/master/pipeline.svg)](https://gitlab.com/frenware/framework/plaindb/cache/-/pipelines)
[![license](https://img.shields.io/npm/l/@plaindb/cache)](https://gitlab.com/frenware/framework/plaindb/cache/-/blob/master/LICENSE)
[![downloads](https://img.shields.io/npm/dw/@plaindb/cache)](https://www.npmjs.com/package/@plaindb/cache) 

[![Gitlab](https://img.shields.io/badge/Gitlab%20-%20?logo=gitlab&color=%23383a40)](https://gitlab.com/frenware/framework/plaindb/cache)
[![Github](https://img.shields.io/badge/Github%20-%20?logo=github&color=%23383a40)](https://github.com/basedwon/cache)
[![Twitter](https://img.shields.io/badge/@basdwon%20-%20?logo=twitter&color=%23383a40)](https://twitter.com/basdwon)
[![Discord](https://img.shields.io/badge/Basedwon%20-%20?logo=discord&color=%23383a40)](https://discordapp.com/users/basedwon)

A simple and extensible caching library built on top of a plain database (such as key-value store). It comes with a built-in eviction strategy and can be extended easily to fit various use-cases. It supports both Least Recently Used (LRU) and Least Frequently Used (LFU) eviction strategies out-of-the-box.

## Features

- Support for LRU and LFU eviction strategies
- Size-based eviction
- Event-driven architecture
- Pruning of cache
- Customizable cache options

## Installation

Install the package with:

```bash
npm install @plaindb/cache
```

## Usage

First, import the `Cache` library.

```js
import Cache from '@plaindb/cache'
```
or
```js
const Cache = require('@plaindb/cache')
```

## Basic Usage

```js
const Cache = require('@plaindb/cache')

// Initialize cache with storage and options
const myCache = new Cache(storageInstance, {
  strategy: 'LRU',
  maxSizeBytes: 1024,
  maxSizeItems: 50
})

// Put data into cache
myCache.put('key', 'value')

// Get data from cache
const data = await myCache.get('key')

// Delete data from cache
myCache.del('key')

// Manually prune the cache
myCache.prune()
```

## Examples

### Using LFU Strategy

```js
const myCache = new Cache(storageInstance, {
  strategy: 'LFU'
})
```

### Creating a Custom Strategy

```js
class MyCustomStrategy extends AbstractEvictionStrategy {
  async get(key) {
    // Custom logic
  }
  // ... implement other methods
}

EvictionStrategyFactory.strategyMap['MyCustomStrategy'] = MyCustomStrategy
```

## Events

Cache instances are event-driven. Currently, the `prune` event is supported, which is emitted when the cache is pruned.

```js
myCache.on('prune', (keys) => {
  console.log(`These keys were pruned: ${keys}`)
})
```

## Documentation

- [API Reference](/docs/api.md)

### Cache

#### `constructor(storage, [options])`

- `storage`: The storage instance where the cache will be stored.
- `options`: An optional object for cache settings, which includes:
  - `strategy`: Eviction strategy. Default is `'LRU'`.
  - `maxSizeBytes`: Maximum cache size in bytes.
  - `maxSizeItems`: Maximum number of items in cache.

#### Methods

- `get(key)`: Fetches the item from cache by key.
- `put(key, value)`: Inserts or updates an item into the cache.
- `del(key)`: Removes an item from the cache by key.
- `prune()`: Manually prunes the cache based on the eviction strategy.

### Strategies

You can create your own eviction strategy by extending `AbstractEvictionStrategy`. Implement the following methods:

- `put(key, value)`
- `get(key)`
- `del(key)`
- `prune()`

After creating, register your strategy like this:

```js
EvictionStrategyFactory.strategyMap['MyStrategy'] = MyStrategy
```

## Tests

In order to run the test suite, simply clone the repository and install its dependencies:

```bash
git clone https://gitlab.com/frenware/framework/plaindb/cache.git
cd cache
npm install
```

To run the tests:

```bash
npm test
```

## Contributing

Thank you! Please see our [contributing guidelines](/docs/contributing.md) for details.

## Donations

If you find this project useful and want to help support further development, please send us some coin. We greatly appreciate any and all contributions. Thank you!

**Bitcoin (BTC):**
```
1JUb1yNFH6wjGekRUW6Dfgyg4J4h6wKKdF
```

**Monero (XMR):**
```
46uV2fMZT3EWkBrGUgszJCcbqFqEvqrB4bZBJwsbx7yA8e2WBakXzJSUK8aqT4GoqERzbg4oKT2SiPeCgjzVH6VpSQ5y7KQ
```

## License

@plaindb/cache is [MIT licensed](https://gitlab.com/frenware/framework/plaindb/cache/-/blob/master/LICENSE).
