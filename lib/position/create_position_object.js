'use strict'

const getDefaultSymbol = require('../data/get_default_symbol')
const BigNumber = require('bignumber.js')
const { calcRealizedTradePnl } = require('../pnl')

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
    id, price, trades = [], stop = null, target = null, tag = ''
  } = args

  const symbol = args.symbol || getDefaultSymbol(state)

  const inventory = []

  let amount = new BigNumber(0)
  const { isDerivative, margin } = state

  trades.forEach((trade) => {
    // no inventory for derivative and margin
    if (isDerivative || margin) {
      trade.realizedPnl = trade.fees ? new BigNumber(trade.fees.cost) : new BigNumber(0)
      amount = amount.plus(trade.amount)
    } else {
      trade.realizedPnl = calcRealizedTradePnl(inventory, trade)
    }
  })

  const realizedPnl = trades.reduce(
    (pnl, trade) => pnl.plus(trade.realizedPnl),
    new BigNumber(0)
  )

  if (!isDerivative && !margin) {
    amount = inventory.reduce(
      (total, { amount }) => total.plus(amount),
      new BigNumber(0)
    )
  }

  return {
    id,
    symbol,
    price,
    amount: amount.toNumber(),
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
