'use strict'

const { calcRealizedTradePnl } = require('../pnl')

module.exports = (position, trade) => {
  let totalAmount = position.amount + trade.amount
  if (trade.amount > 0 && trade.fees) {
    totalAmount += trade.fees.amount.toNumber()
  }

  const posNV = position.amount * position.price
  const tradeNV = trade.amount * trade.price
  const posPrice = (posNV + tradeNV) / totalAmount

  trade.position_id = position.id
  trade.realizedPnl = calcRealizedTradePnl(position, trade)

  const realizedPnl = position.realizedPnl.plus(trade.realizedPnl)

  return {
    ...position,
    amount: totalAmount,
    price: posPrice,
    realizedPnl,
    trades: [
      ...position.trades,
      trade
    ]
  }
}
