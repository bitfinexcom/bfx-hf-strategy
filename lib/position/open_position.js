'use strict'

const openPositionWithOrder = require('./open_position_with_order')

/**
 * Opens a position with a new order; resolves to an error if a position is
 * already open.
 *
 * @memberof module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - passed directly to order constructor
 * @returns {Promise} p
 * @throws {Error} Fails if a position already exists for the specified symbol
 */
const openPosition = async (state = {}, orderParams = {}) => {
  return openPositionWithOrder(state, orderParams)
}

module.exports = openPosition
