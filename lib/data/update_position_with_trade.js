'use strict'

module.exports = (position, trade) => {
  const totalAmount = position.amount + trade.amount
  const posNV = position.amount * position.price
  const tradeNV = trade.amount * trade.price
  const posPrice = (posNV + tradeNV) / totalAmount

  return {
    ...position,

    amount: totalAmount,
    price: posPrice,
    trades: [
      ...position.trades,
      trade
    ]
  }
}
