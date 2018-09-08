'use strict'

const openPositionMarket = require('./open_position_market')

/**
 * Opens a short position (negates passed amount)
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @param {number} orderParams.amount - required
 * @return {Object} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams

  return openPositionMarket(state, {
    ...orderParams,
    amount: -amount
  })
}
