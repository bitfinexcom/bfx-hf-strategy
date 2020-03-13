'use strict'

const candleMarketDataKey = require('./candle_market_data_key')
const getDefaultSymbol = require('./get_default_symbol')
const getDefaultTF = require('./get_default_tf')

/**
 * Returns the candle dataset for the default symbol/tf pair
 *
 * @param {object} state
 * @return {object[]} candles
 */
const getDefaultCandles = (state = {}) => {
  const { marketData = {} } = state
  const symbol = getDefaultSymbol(state)
  const tf = getDefaultTF(state)
  const dataKey = candleMarketDataKey({ symbol, tf })

  return marketData[dataKey] || []
}

module.exports = getDefaultCandles
