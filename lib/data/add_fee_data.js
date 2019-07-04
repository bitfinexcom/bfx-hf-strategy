'use strict'

const tradeMarketDataKey = require('./trade_market_data_key')

/**
 * Updates the trade dataset in-place by pushing a new trade.
 *
 * NOTE: market data is sorted in reverse order, oldest first
 *
 * @param {Object} state
 * @param {Object} trade
 * @return {Object} state - same state!
 */
module.exports = (state = {}, fee = {}) => {
  state['fee'] = fee

  return state
}
