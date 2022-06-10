'use strict'

const removeDust = require('../util/remove_dust')
const getDefaultSymbol = require('../data/get_default_symbol')
// const { SYMBOL_LIST } = require('../../config')

/**
 * Creates a new/fresh position object, as used by the internal strategyState
 *
 * @param {Object} args
 * @param {string} args.symbol
 * @param {number} args.amount
 * @param {number} args.order
 * @param {Object[]?} args.trades
 * @return {Object} position - plain object, needs refactoring/expansion
 * @private
 */
module.exports = (state = {}, args = {}) => {
  const {
    id, price, amount, trades = [], stop = null, target = null, tag = ''
  } = args

  const symbol = args.symbol || getDefaultSymbol(state)

  // if (SYMBOL_LIST.indexOf(symbol) === -1) {
  //   throw new Error('unknown symbol: %s', symbol)
  // }

  const totalEquity = removeDust(price * amount)

  return {
    id,
    symbol,
    price,
    amount,
    trades,
    stop,
    target,
    tag,
    prevPeak: totalEquity,
    peak: totalEquity,
    trough: totalEquity,
    entryPrice: price,
    entryAt: Date.now()
  }
}
