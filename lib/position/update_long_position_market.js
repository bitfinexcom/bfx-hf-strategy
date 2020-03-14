'use strict'

const updatePositionMarket = require('./update_position_market')

/**
 * Updates a long position with a market order
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const updateLongPositionMarket = async (state = {}, orderParams = {}) => {
  return updatePositionMarket(state, orderParams)
}

module.exports = updateLongPositionMarket
