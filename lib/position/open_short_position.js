'use strict'

const openPosition = require('./open_position')

/**
 * Opens a short position (negates passed amount)
 *
 * @throws {Error} Fails if a position already exists for the specified symbol
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const openShortPosition = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams

  return openPosition(state, {
    ...orderParams,
    amount: -amount
  })
}

module.exports = openShortPosition
