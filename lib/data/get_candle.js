'use strict'

const getCandles = require('./get_candles')

/**
 * Reverses candle sort, n = 0 for most recent candle
 *
 * @param {Object} state
 * @param {number} n - index
 * @param {string} symbol
 * @param {string} tf
 * @return {Object} candle
 */
const getCandle = (state = {}, n = 0, symbol, tf) => {
  const candles = getCandles(state, symbol, tf)

  if (candles.length === 0 || n > candles.length) {
    throw new Error('no data/out of bounds')
  }

  return candles[candles.length - n - 1]
}

module.exports = getCandle
