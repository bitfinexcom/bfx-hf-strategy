'use strict'

const updatePosition = require('./update_position')

/**
 * Updates a long position with an order.
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const updateLongPosition = async (state = {}, orderParams = {}) => {
  return updatePosition(state, orderParams)
}

module.exports = updateLongPosition
