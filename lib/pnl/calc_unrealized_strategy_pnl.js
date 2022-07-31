'use strict'

const BigNumber = require('bignumber.js')
const { calcUnrealizedPositionPnl } = require('./index')

module.exports = (strategy, currentPrice) => {
  return Object.values(strategy.positions)
    .reduce(
      (pnl, pos) => pnl.plus(calcUnrealizedPositionPnl(pos, currentPrice)),
      new BigNumber(0)
    )
}
