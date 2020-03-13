'use strict'

const openPositionMarket = require('./open_position_market')

/**
 * Opens a new long position with a market order
 *
 * @param {object} state
 * @param {object} orderParams
 * @return {Promise} p - resolves to nextState
 */
const openLongPositionMarket = async (state = {}, orderParams = {}) => {
  return openPositionMarket(state, orderParams)
}

module.exports = openLongPositionMarket
