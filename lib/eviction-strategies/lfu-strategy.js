const { _, log } = require('basd')
const SizeBasedEvictionStrategy = require('../cache-size-based-strategy')

/**
 * Least Frequently Used (LFU) eviction strategy.
 */
class LFUStrategy extends SizeBasedEvictionStrategy {
  /**
   * @param {Cache} cache - Cache instance.
   */
  constructor(cache) {
    super(cache)
    _.objProp(this, 'frequency', this.cache.storage.sub('frequency'))
  }

  /**
   * Retrieves a value from the cache.
   * @param {string} key - The key.
   * @returns {Promise<*>} The value.
   */
  async get(key) {
    const fullKey = await this.full.get(key)
    if (!fullKey) return null
    const obj = await this.keys.get(fullKey)
    const freq = parseInt(await this.frequency.get(fullKey), 10) || 0
    await this.frequency.put(fullKey, (freq + 1).toString())
    if (this.options.storeValues)
      return this.data.get(key)
    return fullKey
  }

  /**
   * Inserts or updates a key-value pair into the cache.
   * @param {string} key - The key.
   * @param {*} value - The value.
   * @returns {Promise<string>} The namespaced key.
   */
  async put(key, value) {
    const fullKey = await super.put(key, value)
    const existingFrequency = await this.frequency.get(fullKey)
    if (existingFrequency) {
      const newFrequency = (parseInt(existingFrequency, 10) + 1).toString()
      await this.frequency.put(fullKey, newFrequency)
    } else {
      await this.frequency.put(fullKey, '1')
    }
    return fullKey
  }

  /**
   * Deletes a key-value pair from the cache.
   * @param {string} key - The key.
   * @returns {Promise<string|null>} The deleted namespaced key or null.
   */
  async del(key) {
    const fullKey = await this.full.get(key)
    if (fullKey) {
      await super.del(key)
      await this.frequency.del(fullKey)
    }
  }

  /**
   * Prunes the cache by removing the oldest entries.
   * @returns {Promise<void>}
   */
  async prune() {
    let currentSize = await this.getTotalSize()
    const pruneKeys = []
    let entries = []
    for await (const [key, value] of this.frequency.iterator()) {
      entries.push([key, parseInt(value, 10)])
    }
    entries.sort((a, b) => a[1] - b[1])
    for (const [key] of entries) {
      const { key: originalKey, size } = await this.keys.get(key)
      pruneKeys.push(originalKey)
      currentSize -= parseInt(size, 10)
      await this.keys.del(key)
      await this.full.del(originalKey)
      await this.frequency.del(key)
      if (currentSize <= this.threshold) break
    }
    await this.setTotalSize(currentSize)
    this.cache.emit('prune', pruneKeys)
  }
}


module.exports = LFUStrategy
