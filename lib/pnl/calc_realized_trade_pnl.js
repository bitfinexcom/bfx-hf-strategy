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

    if (prevBuy.amount.lessThan(remainingAmount)) {
      remainingAmount = remainingAmount.minus(prevBuy.amount)
      pnl = pnl.plus(priceDiff.multipliedBy(prevBuy.amount))
      continue
    }

    position.inventory.unshift({
      price: prevBuy.price,
      amount: prevBuy.amount.minus(remainingAmount)
    })

    return pnl.plus(priceDiff.multipliedBy(remainingAmount))
  }

  return pnl
}
