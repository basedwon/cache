const { _, log } = require('basd')
const AbstractEvictionStrategy = require('./cache-abstract-strategy')

/**
 * A factory for creating eviction strategies.
 */
class EvictionStrategyFactory {
  /**
   * Creates a strategy instance based on cache options.
   * @param {Cache} cache - Cache instance.
   * @returns {AbstractEvictionStrategy} A strategy instance.
   * @throws {Error} Throws an error if the strategy is not known.
   */
  static createStrategy(cache) {
    let strategy = cache.options.strategy || 'LRU'
    if (_.isString(strategy))
      strategy = cache.constructor.strategies[strategy]
    if (!strategy || !_.isFunction(strategy) || !(strategy.prototype instanceof AbstractEvictionStrategy))
      throw new Error(`Unknown eviction strategy: ${strategy}`)
    return new strategy(cache)
  }
}

module.exports = EvictionStrategyFactory
