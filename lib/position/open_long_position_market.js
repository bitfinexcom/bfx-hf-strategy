'use strict'

const openPositionMarket = require('./open_position_market')

/**
 * Opens a new long position with a market order
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const openLongPositionMarket = async (state = {}, orderParams = {}) => {
  return openPositionMarket(state, orderParams)
}

module.exports = openLongPositionMarket
