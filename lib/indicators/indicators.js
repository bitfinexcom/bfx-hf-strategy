'use strict'

/**
 * Strategy indicators selector
 *
 * @memberof module:Indicators
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @returns {object} indicators
 */
const indicators = (state = {}) => {
  const { indicators = {} } = state
  return indicators
}

module.exports = indicators
