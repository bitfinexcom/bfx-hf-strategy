'use strict'

/**
 * Calls the provided function with each indicator on the strategy.
 *
 * @memberof module:bfx-hf-strategy
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {Function} f - function to call
 */
const forEachIndicator = (state = {}, f = () => {}) => {
  const { indicators = {} } = state

  for (const key in indicators) {
    f(indicators[key], key)
  }
}

module.exports = forEachIndicator
