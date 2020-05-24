'use strict'

const getTrades = require('./get_trades')

/**
 * Returns the trade for the specified market at the specified index. Reverses
 * trade sort, set n = 0 for most recent trade.
 *
 * @memberof module:bfx-hf-strategy
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {number} n - index
 * @param {string} symbol - symbol
 * @returns {module:bfx-api-node-models.PublicTrade} trade
 */
const getTrade = (state = {}, n = 0, symbol) => {
  const trades = getTrades(state, symbol)

  if (trades.length === 0 || n > trades.length) {
    throw new Error('no data/out of bounds')
  }

  return trades[trades.length - n - 1]
}

module.exports = getTrade
