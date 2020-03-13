'use strict'

/**
 * Strategy indicators selector
 *
 * @memberOf module:Indicators
 * @private
 *
 * @param {StrategyState} strategyState - strategy state
 * @returns {object} indicators
 */
const indicators = (strategyState = {}) => {
  const { indicators = {} } = strategyState
  return indicators
}

module.exports = indicators
