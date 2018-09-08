'use strict'

const updatePositionMarket = require('./update_position_market')

/**
 * Updates a long position with a market order
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Object} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  return updatePositionMarket(state, orderParams)
}
