'use strict'

const indicatorsExec = require('./indicators_exec')

/**
 * Returns a map of all indicator values for the provided strategy
 *
 * @param {Object} strategyState
 * @return {Object} iv
 */
module.exports = (strategyState = {}) => {
  return indicatorsExec(strategyState, 'v')
}
