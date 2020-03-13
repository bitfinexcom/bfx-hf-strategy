'use strict'

const openPositionMarket = require('./open_position_market')

/**
 * Opens a short position (negates passed amount)
 *
 * @param {object} state
 * @param {object} orderParams
 * @param {number} orderParams.amount - required
 * @return {Promise} p - resolves to nextState
 */
const openShortPositionMarket = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams

  return openPositionMarket(state, {
    ...orderParams,
    amount: -amount
  })
}

module.exports = openShortPositionMarket
