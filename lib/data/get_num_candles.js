'use strict'

const getCandles = require('./get_candles')

/**
 * @param {object} state
 * @param {string} symbol - defaults to strategy symbol
 * @param {string} tf - defaults to strategy time frame
 * @return {number} numCandles
 */
const getNumCandles = (state = {}, symbol, tf) => {
  return getCandles(state, symbol, tf).length
}

module.exports = getNumCandles
