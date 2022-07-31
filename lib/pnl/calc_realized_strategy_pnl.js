'use strict'

const BigNumber = require('bignumber.js')
const calcRealizedPositionPnl = require('./calc_realized_position_pnl')

module.exports = (strategy) => {
  return Object.values(strategy.positions)
    .concat(strategy.closedPositions)
    .reduce(
      (pnl, pos) => pnl.plus(calcRealizedPositionPnl(pos)),
      new BigNumber(0)
    )
}
