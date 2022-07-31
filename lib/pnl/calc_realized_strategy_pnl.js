'use strict'

const BigNumber = require('bignumber.js')

module.exports = (strategy) => {
  return Object.values(strategy.positions)
    .concat(strategy.closedPositions)
    .reduce(
      (pnl, pos) => pnl.plus(pos.realizedPnl),
      new BigNumber(0)
    )
}
