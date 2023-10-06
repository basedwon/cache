const { _, log, Timestamp, Evented } = require('basd')
const EvictionStrategyFactory = require('./cache-factory')
const LRUStrategy = require('./eviction-strategies/lru-strategy')
const LFUStrategy = require('./eviction-strategies/lfu-strategy')

/**
 * A map to store different eviction strategies.
 */
const STRATEGY_MAP = {}

/**
 * The main Cache class that supports different eviction strategies.
 */
class Cache extends Evented {
  /**
   * Static getter for strategies.
   * @returns {Proxy} A Proxy object for the STRATEGY_MAP.
   */
  static get strategies() { 
    return new Proxy(STRATEGY_MAP, {
      set (target, property, value) {
        target[property] = value
      }
    })
  }

  /**
   * @param {Object} storage - Storage instance.
   * @param {Object} [options={}] - Cache options.
   */
  constructor(storage, options = {}) {
    super()
    _.objProp(this, 'storage', storage)
    _.objProp(this, 'options', options)
    _.objProp(this, 'strategy', EvictionStrategyFactory.createStrategy(this), { show: true })
  }

  /**
   * Retrieves a value from the cache by its key.
   * @param {string} key - The key.
   * @returns {*} The value.
   */
  async get(key) {
    return this.strategy.get(key)
  }

  /**
   * Inserts or updates a key-value pair into the cache.
   * @param {string} key - The key.
   * @param {*} value - The value.
   * @returns {*} The value.
   */
  async put(key, value) {
    return this.strategy.put(key, value)
  }

  /**
   * Deletes a key-value pair from the cache by its key.
   * @param {string} key - The key.
   * @returns {*} The deleted value.
   */
  async del(key) {
    return this.strategy.del(key)
  }

  /**
   * Prunes the cache according to the active eviction strategy.
   * @returns {void}
   */
  async prune() {
    return this.strategy.prune()
  }
}

Cache.strategies.LRU = LRUStrategy
Cache.strategies.LFU = LFUStrategy

module.exports = Cache
