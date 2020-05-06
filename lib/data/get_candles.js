'use strict'

const candleMarketDataKey = require('./candle_market_data_key')
const getDefaultSymbol = require('./get_default_symbol')
const getDefaultTF = require('./get_default_tf')

/**
 * Returns the candle dataset for the specified symbol/timeframe pair
 *
 * @memberof module:Data
 *
 * @param {StrategyState} state - strategy state
 * @param {string} forSymbol - defaults to strategy symbol
 * @param {string} forTF - defaults to strategy tf
 * @returns {Candle[]} candles - sorted oldest first
 * @throws {Error} fails if either symbol or timeframe are not specified
 */
const getCandles = (state = {}, forSymbol, forTF) => {
  const symbol = forSymbol || getDefaultSymbol(state)
  const tf = forTF || getDefaultTF(state)

  if (!symbol || !tf) {
    throw new Error('either symbol/tf not provided and default(s) missing')
  }

  const dataKey = candleMarketDataKey({ symbol, tf })

  return state.marketData[dataKey] || []
}

module.exports = getCandles
