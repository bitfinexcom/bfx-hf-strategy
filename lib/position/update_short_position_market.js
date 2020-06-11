'use strict'

const updatePositionMarket = require('./update_position_market')

/**
 * Updates a short position (negates passed amount)
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
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
