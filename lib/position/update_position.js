'use strict'

const updatePositionWithOrder = require('./update_position_with_order')

/**
 * @param {Object} state
 * @param {Object} orderParams - passed directly to order constructor
 * @return {Object} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  return updatePositionWithOrder(state, orderParams)
}
