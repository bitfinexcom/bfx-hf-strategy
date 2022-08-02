/* eslint-env mocha */

const { expect } = require('chai')
const { calcRealizedTradePnl } = require('../../../lib/pnl')

describe('calc trade pnl', () => {
  const position = {
    inventory: []
  }

  it('buy', () => {
    const trade = {
      price: 100,
      amount: 1,
      fee: 0.002
    }

    const pnl = calcRealizedTradePnl(position, trade)

    expect(pnl.toNumber()).to.eq(-0.2)
    expect(position.inventory).to.have.length(1)
  })

  it('sell', () => {
    const trade = {
      price: 120,
      amount: -1,
      fee: 0.002
    }

    const pnl = calcRealizedTradePnl(position, trade)

    expect(pnl.toNumber()).to.eq(19.96)
    expect(position.inventory).to.have.length(0)
  })
})
