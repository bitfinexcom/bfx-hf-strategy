'use strict'

const tradeMarketDataKey = require('./trade_market_data_key')

/**
 * @param {Object} state
 * @param {string} symbol - defaults to strategy symbol
 * @return {Object[]} trades - sorted oldest first
 */
module.exports = (state = {}, symbol = null) => {
  const defaultSymbol = state.symbol

  if (!defaultSymbol && !symbol) {
    throw new Error('symbol not provided and default missing')
  }

  const dataKey = tradeMarketDataKey({
    symbol: symbol || defaultSymbol
  })

  return state.marketData[dataKey] || []
}
