'use strict'

const openPositionWithOrder = require('./open_position_with_order')

/**
 * Opens a position with a new order; resolves to an error if a position is
 * already open.
 *
 * @param {Object} state
 * @param {Object} orderParams - passed directly to order constructor
 * @return {Object} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  return openPositionWithOrder(state, orderParams)
}
