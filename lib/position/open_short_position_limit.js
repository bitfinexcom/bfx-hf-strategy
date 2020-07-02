'use strict'

const openPositionLimit = require('./open_position_limit')

/**
 * Opens a short position (negates passed amount)
 *
 * @throws {Error} Fails if a position already exists for the specified symbol
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const openShortPositionLimit = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams

  return openPositionLimit(state, {
    ...orderParams,
    amount: -amount
  })
}

module.exports = openShortPositionLimit
