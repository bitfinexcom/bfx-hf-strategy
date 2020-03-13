'use strict'

const tradeMarketDataKey = require('./trade_market_data_key')

/**
 * Updates the trade dataset in-place by pushing a new trade.
 *
 * NOTE: market data is sorted in reverse order, oldest first
 *
 * @param {object} state
 * @param {object} trade
 * @return {object} state - same state!
 * @private
 */
module.exports = (state = {}, trade = {}) => {
  const dataKey = tradeMarketDataKey(trade)

  if (!state.marketData[dataKey]) {
    state.marketData[dataKey] = []
  }

  state.marketData[dataKey].push(trade)

  return state
}
