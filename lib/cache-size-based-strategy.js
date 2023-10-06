const { _, log, Timestamp } = require('basd')
const AbstractEvictionStrategy = require('./cache-abstract-strategy')

/**
 * Size-based eviction strategy.
 */
class SizeBasedEvictionStrategy extends AbstractEvictionStrategy {
  /**
   * @param {Cache} cache - Cache instance.
   */
  constructor(cache) {
    super(cache)
    _.objProp(this, 'conf', this.cache.storage.sub('conf'))
    _.objProp(this, 'keys', this.cache.storage.sub('keys'))
    _.objProp(this, 'full', this.cache.storage.sub('full'))
    if (this.options.storeValues)
      _.objProp(this, 'data', this.cache.storage.sub('data'))
    this.size = 0
    this.maxSize = this.options.maxSizeBytes || 64 || 1024
    this.threshold = this.maxSize - Math.floor(this.maxSize * 0.1)
  }

  /**
   * Gets the total size of the cache.
   * @returns {Promise<number>} The total size in bytes.
   */
  async getTotalSize() {
    return parseInt(await this.conf.get('totalSize'), 10) || 0
  }

  /**
   * Sets the total size of the cache.
   * @param {number} size - The new total size in bytes.
   * @returns {Promise<void>}
   */
  async setTotalSize(size) {
    this.size = parseInt(size, 10)
    await this.conf.put('totalSize', size.toString())
  }

  /**
   * Calculates the size of a key-value pair.
   * @param {string} key - The key.
   * @param {*} value - The value.
   * @returns {number} The size in bytes.
   */
  calculateSize(key, value) {
    return Buffer.byteLength(JSON.stringify(value)) + Buffer.byteLength(key)
  }

  /**
   * Gets a namespaced key for storing in the cache.
   * @param {string} key - The key.
   * @returns {string} The namespaced key.
   */
  getKey(key) {
    return [Timestamp.now(), key].join('.')
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
    const newFullKey = this.getKey(key)
    await this.keys.put(newFullKey, obj)
    await this.keys.del(fullKey)
    await this.full.put(key, newFullKey)
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
    const prevSize = await this.getTotalSize()
    const fullKey = this.getKey(key)
    const sizeBytes = this.calculateSize(fullKey, value)
    const newSize = prevSize + sizeBytes
    await this.setTotalSize(newSize)
    if (newSize >= this.threshold)
      await this.prune()
    await this.keys.put(fullKey, { key, size: sizeBytes })
    await this.full.put(key, fullKey)
    if (this.options.storeValues)
      await this.data.put(key, value)
    return fullKey
  }

  /**
   * Deletes a key-value pair from the cache.
   * @param {string} key - The key.
   * @returns {Promise<string|null>} The deleted namespaced key or null.
   */
  async del(key) {
    const fullKey = await this.full.get(key)
    if (!fullKey)
      return null
    const obj = await this.keys.get(fullKey)
    const sizeBytes = obj.size
    const newSize = await this.getTotalSize() - sizeBytes
    await this.full.del(key)
    await this.keys.del(fullKey)
    await this.setTotalSize(newSize)
    if (this.options.storeValues)
      await this.data.del(key)
    return fullKey
  }

  /**
   * Prunes the cache by removing the oldest entries.
   * @returns {Promise<void>}
   */
  async prune() {
    let currentSize = await this.getTotalSize()
    const pruneKeys = []
    for await (const [timeKey, { key, size }] of this.keys.iterator({ reverse: true })) {
      pruneKeys.push(key)
      currentSize -= parseInt(size, 10)
      await this.keys.del(timeKey)
      await this.full.del(key)
      if (currentSize <= this.threshold) break
    }
    await this.setTotalSize(currentSize)
    this.cache.emit('prune', pruneKeys)
  }
}

module.exports = SizeBasedEvictionStrategy
