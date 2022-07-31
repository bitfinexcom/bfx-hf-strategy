'use strict'

const BigNumber = require('bignumber.js')

module.exports = (position, trade) => {
  const price = new BigNumber(trade.price)
  const amount = new BigNumber(trade.amount)
  let pnl = new BigNumber(0)

  if (amount.isPositive()) {
    position.inventory.push({ price, amount })
    return pnl
  }

  let remainingAmount = amount.abs()

  while (!remainingAmount.isZero()) {
    const prevBuy = position.inventory.shift()
    const priceDiff = price.minus(prevBuy.price)

    if (prevBuy.amount.isLessThan(remainingAmount)) {
      remainingAmount = remainingAmount.minus(prevBuy.amount)
      pnl = pnl.plus(priceDiff.multipliedBy(prevBuy.amount))
      continue
    }

    pnl = pnl.plus(priceDiff.multipliedBy(remainingAmount))
    remainingAmount = remainingAmount.minus(prevBuy.amount)

    if (remainingAmount.isGreaterThan(0)) {
      position.inventory.unshift({
        price: prevBuy.price,
        amount: remainingAmount
      })
    }

    return pnl
  }

  return pnl
}
