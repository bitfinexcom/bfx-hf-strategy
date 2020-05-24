'use strict'

const updatePositionMarket = require('./update_position_market')

/**
 * Updates a short position (negates passed amount)
 *
 * @memberof module:Positions
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-hf-strategy.OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const updateShortPositionMarket = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams

  return updatePositionMarket(state, {
    ...orderParams,
    amount: -amount
  })
}

module.exports = updateShortPositionMarket
