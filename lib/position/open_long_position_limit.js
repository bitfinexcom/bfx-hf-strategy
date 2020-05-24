'use strict'

const openPositionLimit = require('./open_position_limit')

/**
 * Opens a new long position with a limit order
 *
 * @memberof module:Positions
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-hf-strategy.OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const openLongPositionLimit = async (state = {}, orderParams = {}) => {
  return openPositionLimit(state, orderParams)
}

module.exports = openLongPositionLimit
