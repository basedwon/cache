const Storage = require('@plaindb/storage/mock')
const Cache = require('../lib/cache')

let storage

describe('LRU Strategy', () => {
  beforeEach(() => storage = new Storage())

  it('should put and get a value', async () => {
    const cache = new Cache(storage.sub('cache'), {
      strategy: 'LRU',
      maxSizeBytes: 1024,
      storeValues: true,
    })
    await cache.put('foo', 'bar')
    const value = await cache.get('foo')
    expect(value).to.equal('bar')
  })

  it('should delete a value', async () => {
    const cache = new Cache(storage.sub('cache'), {
      strategy: 'LRU',
      maxSizeBytes: 1024,
      storeValues: true
    })
    await cache.put('foo', 'bar')
    await cache.del('foo')
    const value = await cache.get('foo')
    expect(value).to.be.null
  })

  it('should emit prune event', async () => {
    const cache = new Cache(storage.sub('cache'), {
      strategy: 'LRU',
      maxSizeBytes: 64,
      storeValues: true
    })
    await new Promise(async resolve => {
      cache.on('prune', (keys) => {
        expect(keys).to.be.an('array')
        resolve()
      })
      await cache.put('foo', 'bar')
      await cache.put('baz', 'qux')
      await cache.put('spam', 'eggs')
    })
  })
})

describe('LFU Strategy', () => {
  beforeEach(() => storage = new Storage())

  it('should put and get a value', async () => {
    const cache = new Cache(storage.sub('cache'), {
      strategy: 'LFU',
      maxSizeBytes: 1024,
      storeValues: true,
    })
    await cache.put('foo', 'bar')
    const value = await cache.get('foo')
    expect(value).to.equal('bar')
  })

  it('should delete a value', async () => {
    const cache = new Cache(storage.sub('cache'), {
      strategy: 'LFU',
      maxSizeBytes: 1024,
      storeValues: true
    })
    await cache.put('foo', 'bar')
    await cache.del('foo')
    const value = await cache.get('foo')
    expect(value).to.be.null
  })

  it('should emit prune event', async () => {
    const cache = new Cache(storage.sub('cache'), {
      strategy: 'LFU',
      maxSizeBytes: 64,
      storeValues: true
    })
    await new Promise(async resolve => {
      cache.on('prune', (keys) => {
        expect(keys).to.be.an('array')
        resolve()
      })
      await cache.put('foo', 'bar')
      await cache.put('baz', 'qux')
      await cache.put('spam', 'eggs')
    })
  })
})
