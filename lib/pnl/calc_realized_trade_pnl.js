'use strict'

const BigNumber = require('bignumber.js')

module.exports = (position, trade) => {
  const price = new BigNumber(trade.price)
  const amount = new BigNumber(trade.amount)
  const fee = new BigNumber(trade.fee)
  let pnl = new BigNumber(0)

  if (amount.isPositive()) {
    position.inventory.push({ price, amount })
    const feeCost = price.multipliedBy(amount.multipliedBy(fee))
    return pnl.minus(feeCost)
  }

  let remainingAmount = amount.abs()

  while (!remainingAmount.isZero()) {
    const { price: buyPrice, amount: buyAmount } = position.inventory.shift()
    const priceDiff = price.minus(buyPrice)
    const partialAmount = buyAmount.isLessThan(remainingAmount) ? buyAmount : remainingAmount

    pnl = pnl.plus(
      priceDiff.multipliedBy(partialAmount.minus(partialAmount.multipliedBy(fee)))
    )
    remainingAmount = remainingAmount.minus(partialAmount)

    if (buyAmount.minus(partialAmount).isGreaterThan(0)) {
      position.inventory.unshift({
        price: buyPrice,
        amount: buyAmount.minus(partialAmount)
      })
    }
  }

  return pnl
}
