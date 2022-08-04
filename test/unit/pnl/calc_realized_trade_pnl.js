/* eslint-env mocha */

const { expect } = require('chai')
const { calcRealizedTradePnl } = require('../../../lib/pnl')
const BigNumber = require('bignumber.js')

describe('calc trade pnl', () => {
  const position = {
    inventory: []
  }

  const fee = 0.002
  const trades = [
    { price: 31076.83, amount: 1, fee },
    { price: 31599.44, amount: -0.16, fee },
    { price: 31599.44, amount: 0.25, fee },
    { price: 31770.26, amount: 0.25, fee },
    { price: 31760.00, amount: -1.34, fee }
  ]

  it('calc gross pnl', () => {
    let totalPnl = new BigNumber(0)

    for (const trade of trades) {
      const tradePnl = calcRealizedTradePnl(position, trade)
      totalPnl = totalPnl.plus(tradePnl)
    }

    expect(totalPnl.toNumber()).to.eq(695.0554)
    expect(position.inventory).to.have.length(0)
  })
})
