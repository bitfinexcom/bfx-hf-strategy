'use strict'

/**
 * Calls the provided function with each indicator on the strategy.
 *
 * @memberOf module:Indicators
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {Function} f - function to call
 */
const forEachIndicator = (state = {}, f = () => {}) => {
  const { indicators = {} } = state

  for (const key in indicators) {
    f(indicators[key], key)
  }
}

module.exports = forEachIndicator
