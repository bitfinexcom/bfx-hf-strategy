'use strict'

const BigNumber = require('bignumber.js')
const calcUnrealizedPositionPnl = require('./calc_unrealized_position_pnl')

module.exports = (strategy, currentPrice) => {
  return Object.values(strategy.positions)
    .reduce(
      (pnl, pos) => pnl.plus(calcUnrealizedPositionPnl(pos, currentPrice)),
      new BigNumber(0)
    )
}
