'use strict'

const openPositionLimit = require('./open_position_limit')

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

  return openPositionLimit(state, {
    ...orderParams,
    amount: -amount
  })
}
