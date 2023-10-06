const SizeBasedEvictionStrategy = require('../cache-size-based-strategy')

/**
 * Least Recently Used (LRU) eviction strategy.
 */
class LRUStrategy extends SizeBasedEvictionStrategy {
  // No additional logic here, inherits from SizeBasedEvictionStrategy
}

module.exports = LRUStrategy
