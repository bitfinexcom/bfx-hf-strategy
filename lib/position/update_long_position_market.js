'use strict'

const updatePositionMarket = require('./update_position_market')

/**
 * Updates a long position with a market order
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Promise} p - resolves to nextState
 */
const updateLongPositionMarket = async (state = {}, orderParams = {}) => {
  return updatePositionMarket(state, orderParams)
}

module.exports = updateLongPositionMarket
