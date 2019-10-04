'use strict'

const openPosition = require('./open_position')

/**
 * Opens a short position (negates passed amount)
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @param {number} orderParams.amount - required
 * @return {Promise} p - resolves to nextState
 */
const openShortPosition = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams

  return openPosition(state, {
    ...orderParams,
    amount: -amount
  })
}

module.exports = openShortPosition
