'use strict'

const getIndicators = require('./get_indicators')

/**
 * Returns an indicator by ID
 *
 * @memberof module:bfx-hf-strategy
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {string} id - indicator ID
 * @returns {Indicator} indicator
 */
const getIndicator = (state = {}, id) => {
  return getIndicators(state)[id]
}

module.exports = getIndicator
