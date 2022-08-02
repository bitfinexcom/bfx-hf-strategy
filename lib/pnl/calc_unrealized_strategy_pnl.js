'use strict'

const BigNumber = require('bignumber.js')
const calcUnrealizedPositionPnl = require('./calc_unrealized_position_pnl')

module.exports = ({ positions = {} }, currentPrice) => {
  return Object.values(positions)
    .reduce(
      (pnl, pos) => pnl.plus(calcUnrealizedPositionPnl(pos, currentPrice)),
      new BigNumber(0)
    )
}
