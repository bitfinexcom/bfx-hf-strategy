'use strict'

const updatePositionWithOrder = require('./update_position_with_order')

/**
 * Alias for updatePositionWithOrder
 *
 * @param {object} state
 * @param {object} orderParams - passed directly to order constructor
 * @return {Promise} p - resolves to nextState
 */
const updatePosition = async (state = {}, orderParams = {}) => {
  return updatePositionWithOrder(state, orderParams)
}

module.exports = updatePosition
