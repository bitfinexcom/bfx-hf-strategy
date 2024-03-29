'use strict'

const BigNumber = require('bignumber.js')

module.exports = (inventory, trade) => {
  const price = new BigNumber(trade.price)
  const amount = new BigNumber(trade.amount)

  let pnl = new BigNumber(0)
  let fee = new BigNumber(0)

  if (trade.fees) {
    pnl = trade.fees.cost
    fee = trade.fees.amount
  }

  if (amount.isPositive()) {
    inventory.push({
      price,
      amount: amount.plus(fee)
    })
    return pnl
  }

  let remainingAmount = amount.abs()

  while (!remainingAmount.isZero() && inventory.length > 0) {
    const { price: buyPrice, amount: buyAmount } = inventory.shift()
    const priceDiff = price.minus(buyPrice)
    const partialAmount = buyAmount.isLessThan(remainingAmount) ? buyAmount : remainingAmount

    pnl = pnl.plus(
      priceDiff.multipliedBy(partialAmount)
    )
    remainingAmount = remainingAmount.minus(partialAmount)

    if (buyAmount.minus(partialAmount).isGreaterThan(0)) {
      inventory.unshift({
        price: buyPrice,
        amount: buyAmount.minus(partialAmount)
      })
    }
  }

  return pnl
}
