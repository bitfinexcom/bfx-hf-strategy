'use strict'

const updatePosition = require('./update_position')

/**
 * Updates a short position (negates passed amount)
 *
 * @memberof module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const updateShortPosition = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams

  return updatePosition(state, {
    ...orderParams,
    amount: -amount
  })
}

module.exports = updateShortPosition
