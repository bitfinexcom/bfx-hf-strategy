'use strict'

const tradeMarketDataKey = require('./trade_market_data_key')
const getDefaultSymbol = require('./get_default_symbol')

/**
 * Returns the trade dataset for the default symbol
 *
 * @param {Object} state
 * @return {Object[]} trades
 */
module.exports = (state = {}) => {
  const { marketData = {} } = state
  const symbol = getDefaultSymbol(state)
  const dataKey = tradeMarketDataKey({ symbol })

  return marketData[dataKey] || []
}
