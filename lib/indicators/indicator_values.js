'use strict'

const indicatorsExec = require('./indicators_exec')

/**
 * Returns a map of all indicator values for the provided strategy
 *
 * @memberOf module:Indicators
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @returns {object} iv
 */
const indicatorValues = (state = {}) => {
  return indicatorsExec(state, 'v')
}

module.exports = indicatorValues
