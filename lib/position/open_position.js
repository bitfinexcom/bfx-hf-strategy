'use strict'

const openPositionWithOrder = require('./open_position_with_order')

/**
 * Opens a position with a new order; resolves to an error if a position is
 * already open.
 *
 * @throws {Error} Fails if a position already exists for the specified symbol
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - passed directly to order constructor
 * @returns {Promise} p
 */
const openPosition = async (state = {}, orderParams = {}) => {
  return openPositionWithOrder(state, orderParams)
}

module.exports = openPosition
