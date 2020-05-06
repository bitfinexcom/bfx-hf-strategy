'use strict'

const updatePositionLimit = require('./update_position_limit')

/**
 * Updates a short position (negates passed amount)
 *
 * @memberof module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const updateShortPositionLimit = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams

  return updatePositionLimit(state, {
    ...orderParams,
    amount: -amount
  })
}

module.exports = updateShortPositionLimit
