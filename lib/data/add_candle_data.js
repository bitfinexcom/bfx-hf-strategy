'use strict'

const candleMarketDataKey = require('./candle_market_data_key')

/**
 * Updates the candle dataset in-place by pushing a new candle
 *
 * NOTE: market data is sorted in reverse order, oldest first
 *
 * @memberof module:bfx-hf-strategy
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-api-node-models.Candle} candle - incoming candle
 */
const addCandleData = (state = {}, candle = {}) => {
  const dataKey = candleMarketDataKey(candle)

  if (!state.marketData[dataKey]) {
    state.marketData[dataKey] = []
  }

  state.marketData[dataKey].push(candle)
}

module.exports = addCandleData
