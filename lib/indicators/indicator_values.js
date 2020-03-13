'use strict'

const indicatorsExec = require('./indicators_exec')

/**
 * Returns a map of all indicator values for the provided strategy
 *
 * @param {object} strategyState
 * @return {object} iv
 */
const indicatorValues = (strategyState = {}) => {
  return indicatorsExec(strategyState, 'v')
}

module.exports = indicatorValues
