'use strict'

const updatePositionMarket = require('./update_position_market')

/**
 * Updates a long position with a market order
 *
 * @memberof module:Positions
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-hf-strategy.OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const updateLongPositionMarket = async (state = {}, orderParams = {}) => {
  return updatePositionMarket(state, orderParams)
}

module.exports = updateLongPositionMarket
