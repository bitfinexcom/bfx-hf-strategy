'use strict'

const { calcRealizedTradePnl } = require('../pnl')

module.exports = (position, trade) => {
  const totalAmount = position.amount + trade.amount
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
