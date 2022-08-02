'use strict'

const getDefaultSymbol = require('../data/get_default_symbol')
const BigNumber = require('bignumber.js')

/**
 * Creates a new/fresh position object, as used by the internal strategyState
 *
 * @param {Object} state
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

  const inventory = trades.filter(trade => trade.amount > 0)
    .map(trade => {
      return {
        amount: new BigNumber(trade.amount),
        price: new BigNumber(trade.price)
      }
    })

  const realizedPnl = trades.reduce(
    (pnl, trade) => pnl.plus(trade.realizedPnl),
    new BigNumber(0)
  )

  return {
    id,
    symbol,
    price,
    amount,
    trades,
    stop,
    target,
    tag,
    realizedPnl,
    inventory,
    entryPrice: price,
    entryAt: Date.now()
  }
}
