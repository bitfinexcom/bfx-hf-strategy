/* eslint-env mocha */

const { expect } = require('chai')
const { calcRealizedTradePnl } = require('../../../lib/pnl')
const BigNumber = require('bignumber.js')

describe('calc trade pnl', () => {
  const inventory = []

  const trades = [
    {
      price: 31076.83,
      amount: 1,
      fees: {
        cost: new BigNumber(-62.15366),
        amount: new BigNumber(-0.002)
      }
    },
    {
      price: 31599.44,
      amount: -0.16,
      fees: {
        cost: new BigNumber(-10.1118208),
        amount: new BigNumber(-0.16)
      }
    },
    {
      price: 31599.44,
      amount: 0.25,
      fees: {
        cost: new BigNumber(-15.79972),
        amount: new BigNumber(-0.0005)
      }
    },
    {
      price: 31770.26,
      amount: 0.25,
      fees: {
        cost: new BigNumber(-15.88513),
        amount: new BigNumber(-0.0005)
      }
    },
    {
      price: 31760.00,
      amount: -1.34,
      fees: {
        cost: new BigNumber(-85.1168),
        amount: new BigNumber(-1.34)
      }
    }
  ]

  it('calc gross pnl', () => {
    let totalPnl = new BigNumber(0)

    for (const trade of trades) {
      const tradePnl = calcRealizedTradePnl(inventory, trade)
      totalPnl = totalPnl.plus(tradePnl)
    }

    expect(totalPnl.toString()).to.eq('504.5467792')
    expect(inventory).to.have.length(0)
  })
})
