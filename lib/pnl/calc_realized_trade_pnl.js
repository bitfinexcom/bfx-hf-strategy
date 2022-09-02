'use strict'

const BigNumber = require('bignumber.js')

module.exports = (position, trade) => {
  const price = new BigNumber(trade.price)
  const amount = new BigNumber(trade.amount)

  let pnl = new BigNumber(0)
  let fee = new BigNumber(0)

  if (trade.fees) {
    pnl = new BigNumber(trade.fees.cost)
    fee = new BigNumber(trade.fees.amount)
  }

  console.log('@@pnl', { pnl: pnl.toNumber(), fee: fee.toNumber() })

  if (amount.isPositive()) {
    position.inventory.push({
      price,
      amount: amount.plus(fee)
    })
    console.log('@@pnl', { amount: amount.plus(fee).toNumber() })
    return pnl
  }

  let remainingAmount = amount.abs().plus(fee)

  console.log('@@pnl', { ra: remainingAmount.toNumber() })

  while (!remainingAmount.isZero() && position.inventory.length > 0) {
    const { price: buyPrice, amount: buyAmount } = position.inventory.shift()
    const priceDiff = price.minus(buyPrice)
    const partialAmount = buyAmount.isLessThan(remainingAmount) ? buyAmount : remainingAmount

    pnl = pnl.plus(
      priceDiff.multipliedBy(partialAmount)
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
