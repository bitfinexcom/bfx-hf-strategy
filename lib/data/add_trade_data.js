'use strict'

const tradeMarketDataKey = require('./trade_market_data_key')

/**
 * Updates the trade dataset in-place by pushing a new trade.
 *
 * NOTE: market data is sorted in reverse order, oldest first
 *
 * @memberof module:Data
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {Trade} trade - incoming trade
 * @returns {StrategyState} state - same state reference
 */
const addTradeData = (state = {}, trade = {}) => {
  const dataKey = tradeMarketDataKey(trade)

  if (!state.marketData[dataKey]) {
    state.marketData[dataKey] = []
  }

  state.marketData[dataKey].push(trade)

  return state
}

module.exports = addTradeData
