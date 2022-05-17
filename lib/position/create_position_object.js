'use strict'

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

  return {
    id,
    symbol,
    price,
    amount,
    trades,
    stop,
    target,
    tag,
    entryPrice: price,
    entryAt: Date.now()
  }
}
