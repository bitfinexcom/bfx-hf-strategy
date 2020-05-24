'use strict'

const tradeMarketDataKey = require('./trade_market_data_key')

/**
 * Updates the trade dataset in-place by pushing a new trade.
 *
 * NOTE: market data is sorted in reverse order, oldest first
 *
 * @memberof module:bfx-hf-strategy
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-api-node-models.PublicTrade} trade - incoming trade
 * @returns {module:bfx-hf-strategy.StrategyState} state - same state reference
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
