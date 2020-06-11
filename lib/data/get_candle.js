'use strict'

const getCandles = require('./get_candles')

/**
 * Reverses candle sort, n = 0 for most recent candle
 *
 * @param {StrategyState} state - strategy state
 * @param {number} n - index
 * @param {string} symbol - symbol
 * @param {string} tf - timeframe
 * @returns {bfx-api-node-models.Candle} candle
 */
const getCandle = (state = {}, n = 0, symbol, tf) => {
  const candles = getCandles(state, symbol, tf)

  if (candles.length === 0 || n > candles.length) {
    throw new Error('no data/out of bounds')
  }

  return candles[candles.length - n - 1]
}

module.exports = getCandle
