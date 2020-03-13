'use strict'

const openPositionMarket = require('./open_position_market')

/**
 * Opens a short position (negates passed amount)
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p - resolves to nextState
 * @throws {Error} Fails if a position already exists for the specified symbol
 */
const openShortPositionMarket = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams

  return openPositionMarket(state, {
    ...orderParams,
    amount: -amount
  })
}

module.exports = openShortPositionMarket
