'use strict'

const candleMarketDataKey = require('./candle_market_data_key')
const getDefaultSymbol = require('./get_default_symbol')
const getDefaultTF = require('./get_default_tf')

/**
 * Returns the candle dataset for the default symbol/tf pair
 *
 * @throws {Error} fails if either symbol or timeframe are not specified
 *
 * @param {StrategyState} state - strategy state
 * @returns {Candle[]} candles
 */
const getDefaultCandles = (state = {}) => {
  const { marketData = {} } = state
  const symbol = getDefaultSymbol(state)
  const tf = getDefaultTF(state)

  if (!symbol || !tf) {
    throw new Error('either symbol/tf not provided and default(s) missing')
  }

  const dataKey = candleMarketDataKey({ symbol, tf })

  return marketData[dataKey] || []
}

module.exports = getDefaultCandles
