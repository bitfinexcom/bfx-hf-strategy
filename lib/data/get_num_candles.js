'use strict'

const getCandles = require('./get_candles')

/**
 * @param {Object} state
 * @param {string} symbol - defaults to strategy symbol
 * @param {string} tf - defaults to strategy time frame
 * @return {number} numCandles
 */
module.exports = (state = {}, symbol, tf) => {
  return getCandles(state, symbol, tf).length
}
