'use strict'

const openPosition = require('./open_position')

/**
 * Opens a short position (negates passed amount)
 *
 * @memberof module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 * @throws {Error} Fails if a position already exists for the specified symbol
 */
const openShortPosition = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams

  return openPosition(state, {
    ...orderParams,
    amount: -amount
  })
}

module.exports = openShortPosition
