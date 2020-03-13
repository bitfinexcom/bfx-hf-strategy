'use strict'

const indicatorsExec = require('./indicators_exec')

/**
 * Returns a map of all indicator values for the provided strategy
 *
 * @memberOf module:Indicators
 * @private
 *
 * @param {StrategyState} strategyState - strategy state
 * @returns {object} iv
 */
const indicatorValues = (strategyState = {}) => {
  return indicatorsExec(strategyState, 'v')
}

module.exports = indicatorValues
