'use strict'

/**
 * Returns the indicator map for the strategy
 *
 * @memberof module:bfx-hf-strategy
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @returns {object} indicators
 */
const getIndicators = (state = {}) => {
  const { indicators = {} } = state
  return indicators
}

module.exports = getIndicators
