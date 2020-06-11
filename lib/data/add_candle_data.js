'use strict'

const candleMarketDataKey = require('./candle_market_data_key')

/**
 * Updates the candle dataset in-place with a new candle
 *
 * @param {StrategyState} state - strategy state
 * @param {bfx-api-node-models.Candle} candle - incoming candle
 */
const addCandleData = (state = {}, candle = {}) => {
  const dataKey = candleMarketDataKey(candle)

  if (!state.marketData[dataKey]) {
    state.marketData[dataKey] = []
  }

  state.marketData[dataKey].push(candle)
}

module.exports = addCandleData
