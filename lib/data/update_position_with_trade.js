'use strict'

/**
 * Adds the trade to the position state
 *
 * @memberOf module:Data
 * @private
 *
 * @param {Position} position - position
 * @param {Trade} trade - trade
 * @returns {Position} updatedPosition
 */
const updatePositionWithTrade = (position, trade) => {
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

module.exports = updatePositionWithTrade
