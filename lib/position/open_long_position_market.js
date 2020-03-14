'use strict'

const openPositionMarket = require('./open_position_market')

/**
 * Opens a new long position with a market order
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams
 * @returns {Promise} p
 */
const openLongPositionMarket = async (state = {}, orderParams = {}) => {
  return openPositionMarket(state, orderParams)
}

module.exports = openLongPositionMarket
