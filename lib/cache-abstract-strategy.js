const { _, log } = require('basd')

/**
 * An abstract class that defines eviction strategy interface.
 */
class AbstractEvictionStrategy {

  /**
   * @param {Cache} cache - Cache instance.
   */
  constructor(cache) {
    _.objProp(this, 'cache', cache)
    _.objProp(this, 'options', _.defaults(this.cache.options, {
      maxSizeBytes: 1024,
      maxSizeItems: 50,
      storeValues: false,
    }))
  }

  /**
   * Put a key-value pair into the cache.
   * @param {string} key - The key.
   * @param {*} value - The value.
   * @throws {Error} Throws an error if the method is not implemented.
   */
  async put(key, value) {
    throw new Error(`The put() method has not been implemented`)
  }

  /**
   * Get a value by its key from the cache.
   * @param {string} key - The key.
   * @throws {Error} Throws an error if the method is not implemented.
   */
  async get(key) {
    throw new Error(`The get() method has not been implemented`)
  }

  /**
   * Delete a key-value pair from the cache by its key.
   * @param {string} key - The key.
   * @throws {Error} Throws an error if the method is not implemented.
   */
  async del(key) {
    throw new Error(`The del() method has not been implemented`)
  }

  /**
   * Prune the cache based on the implemented eviction strategy.
   * @throws {Error} Throws an error if the method is not implemented.
   */
  async prune() {
    throw new Error(`The prune() method has not been implemented`)
  }
}

module.exports = AbstractEvictionStrategy
