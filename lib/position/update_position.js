'use strict'

const updatePositionWithOrder = require('./update_position_with_order')

/**
 * Alias for updatePositionWithOrder
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - passed directly to order constructor
 * @returns {Promise} p
 */
const updatePosition = async (state = {}, orderParams = {}) => {
  return updatePositionWithOrder(state, orderParams)
}

module.exports = updatePosition
