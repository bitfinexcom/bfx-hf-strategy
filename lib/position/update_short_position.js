'use strict'

const updatePosition = require('./update_position')

/**
 * Updates a short position (negates passed amount)
 *
 * @memberof module:Positions
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-hf-strategy.OrderParameters} orderParams - order parameters
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
