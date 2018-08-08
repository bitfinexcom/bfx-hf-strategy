'use strict'

const updatePositionLimit = require('./update_position_limit')

/**
 * Updates a short position (negates passed amount)
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @param {number} orderParams.amount - required
 * @return {Object} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams

  return updatePositionLimit(state, {
    ...orderParams,
    amount: -amount
  })
}
