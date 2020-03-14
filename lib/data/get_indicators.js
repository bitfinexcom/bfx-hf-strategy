'use strict'

/**
 * Returns the indicator map for the strategy
 *
 * @memberOf module:Data
 *
 * @param {StrategyState} state - strategy state
 * @returns {object} indicators
 */
const getIndicators = (state = {}) => {
  const { indicators = {} } = state
  return indicators
}

module.exports = getIndicators