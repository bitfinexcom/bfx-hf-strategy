'use strict'

const candleMarketDataKey = require('./candle_market_data_key')

/**
 * Updates the candle dataset in-place by pushing a new candle
 *
 * NOTE: market data is sorted in reverse order, oldest first
 *
 * @memberOf module:Data
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {Candle} candle - incoming candle
 */
const addCandleData = (state = {}, candle = {}) => {
  const dataKey = candleMarketDataKey(candle)

  if (!state.marketData[dataKey]) {
    state.marketData[dataKey] = []
  }

  state.marketData[dataKey].push(candle)
}

module.exports = addCandleData
