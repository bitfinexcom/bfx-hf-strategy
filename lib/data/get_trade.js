'use strict'

const getTrades = require('./get_trades')

/**
 * Reverses trade sort, n = 0 for most recent trade
 *
 * @param {object} state
 * @param {number} n - index
 * @param {string} symbol
 * @param {string} tf
 * @return {object} trade
 */
const getTrade = (state = {}, n = 0, symbol, tf) => {
  const trades = getTrades(state, symbol, tf)

  if (trades.length === 0 || n > trades.length) {
    throw new Error('no data/out of bounds')
  }

  return trades[trades.length - n - 1]
}

module.exports = getTrade
