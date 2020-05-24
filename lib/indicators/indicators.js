'use strict'

/**
 * Strategy indicators selector
 *
 * @memberof module:bfx-hf-strategy
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @returns {object} indicators
 */
const indicators = (state = {}) => {
  const { indicators = {} } = state
  return indicators
}

module.exports = indicators
