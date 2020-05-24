'use strict'

const tradeMarketDataKey = require('./trade_market_data_key')
const getDefaultSymbol = require('./get_default_symbol')

/**
 * Returns the trade dataset for the default symbol
 *
 * @memberof module:bfx-hf-strategy
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @returns {object[]} trades
 */
const getDefaultTrades = (state = {}) => {
  const { marketData = {} } = state
  const symbol = getDefaultSymbol(state)
  const dataKey = tradeMarketDataKey({ symbol })

  return marketData[dataKey] || []
}

module.exports = getDefaultTrades
