'use strict'

const updatePositionLimit = require('./update_position_limit')

/**
 * Updates a long position with a limit order
 *
 * @memberof module:Positions
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-hf-strategy.OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const updateLongPositionLimit = async (state = {}, orderParams = {}) => {
  return updatePositionLimit(state, orderParams)
}

module.exports = updateLongPositionLimit
