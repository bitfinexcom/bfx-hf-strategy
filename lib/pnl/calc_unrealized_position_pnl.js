'use strict'

const BigNumber = require('bignumber.js')

module.exports = (position, currentPrice) => {
  let sum = new BigNumber(0)
  let volume = new BigNumber(0)

  for (const { amount, price } of position.inventory) {
    sum = sum.plus(price.multipliedBy(amount))
    volume = volume.plus(amount)
  }

  if (volume.isZero()) {
    return new BigNumber(0)
  }

  const avgPrice = sum.dividedBy(volume)

  return new BigNumber(currentPrice).minus(avgPrice).multipliedBy(volume)
}
