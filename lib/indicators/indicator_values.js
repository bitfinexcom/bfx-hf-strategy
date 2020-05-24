'use strict'

const indicatorsExec = require('./indicators_exec')

/**
 * Returns a map of all indicator values for the provided strategy
 *
 * @memberof module:bfx-hf-strategy
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @returns {object} iv
 */
const indicatorValues = (state = {}) => {
  return indicatorsExec(state, 'v')
}

module.exports = indicatorValues
