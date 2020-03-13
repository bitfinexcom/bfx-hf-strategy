'use strict'

const candleMarketDataKey = require('./candle_market_data_key')

/**
 * Updates the candle dataset in-place by pushing a new candle
 *
 * NOTE: market data is sorted in reverse order, oldest first
 *
 * @param {object} state
 * @param {object} candle
 * @return {object} state - same state!
 * @private
 */
module.exports = (state = {}, candle = {}) => {
  const dataKey = candleMarketDataKey(candle)

  if (!state.marketData[dataKey]) {
    state.marketData[dataKey] = []
  }

  state.marketData[dataKey].push(candle)

  return state
}
