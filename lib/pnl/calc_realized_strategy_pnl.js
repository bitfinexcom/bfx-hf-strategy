'use strict'

const BigNumber = require('bignumber.js')
const calcRealizedPositionPnl = require('./calc_realized_position_pnl')

module.exports = ({ positions = {}, closedPositions = [] }) => {
  return Object.values(positions)
    .concat(closedPositions)
    .reduce(
      (pnl, pos) => pnl.plus(calcRealizedPositionPnl(pos)),
      new BigNumber(0)
    )
}
