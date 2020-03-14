'use strict'

const getIndicators = require('./get_indicators')

/**
 * Returns an indicator by ID
 *
 * @memberOf module:Data
 *
 * @param {StrategyState} state - strategy state
 * @param {string} id - indicator ID
 * @returns {Indicator} indicator
 */
const getIndicator = (state = {}, id) => {
  return getIndicators(state)[id]
}

module.exports = getIndicator
