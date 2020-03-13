'use strict'

const updatePositionMarket = require('./update_position_market')

/**
 * Updates a short position (negates passed amount)
 *
 * @param {object} state
 * @param {object} orderParams
 * @param {number} orderParams.amount - required
 * @return {Promise} p - resolves to nextState
 */
const updateShortPositionMarket = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams

  return updatePositionMarket(state, {
    ...orderParams,
    amount: -amount
  })
}

module.exports = updateShortPositionMarket
