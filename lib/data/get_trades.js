'use strict'

const tradeMarketDataKey = require('./trade_market_data_key')

/**
 * Returns all known trades for the specified symbol
 *
 * @memberOf module:Data
 *
 * @param {StrategyState} state - strategy state
 * @param {string} [symbol] - defaults to strategy symbol
 * @returns {Trade[]} trades - sorted oldest first
 */
const getTrades = (state = {}, symbol = null) => {
  const defaultSymbol = state.symbol

  if (!defaultSymbol && !symbol) {
    throw new Error('symbol not provided and default missing')
  }

  const dataKey = tradeMarketDataKey({
    symbol: symbol || defaultSymbol
  })

  return state.marketData[dataKey] || []
}

module.exports = getTrades
