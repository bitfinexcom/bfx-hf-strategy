/* eslint-disable no-unused-expressions */
/* eslint-env mocha */

const { expect } = require('chai')
const calculateLeverage = require('../../../lib/util/calculate_leverage')

describe('calculate leverage for derivatives order', () => {
  const userLeverage = 10
  const baseCurrency = 'TESTBTCF0'
  const quoteCurrency = 'TESTUSDTF0'
  const symbol = 'tTESTBTCF0:TESTUSDTF0'
  const price = 25000
  const maxLeverage = 100

  const marginWallet = {
    currency: 'TESTUSDTF0',
    type: 'margin',
    balance: 10,
    balanceAvailable: 10
  }

  it('user leverage', async () => {
    const amount = 0.001
    const args = {
      leverage: userLeverage,
      increaseLeverage: false,
      maxLeverage,
      wallets: [marginWallet],
      quoteCurrency,
      baseCurrency,
      symbol,
      amount,
      price
    }

    const leverage = await calculateLeverage(args)
    expect(leverage).to.be.eq(userLeverage)
  })

  it('increased leverage', async () => {
    const amount = 0.01
    const args = {
      leverage: userLeverage,
      increaseLeverage: true,
      maxLeverage,
      wallets: [marginWallet],
      quoteCurrency,
      baseCurrency,
      symbol,
      amount,
      price
    }

    const leverage = await calculateLeverage(args)
    expect(leverage).to.be.greaterThan(userLeverage)
    expect(leverage).to.be.lessThanOrEqual(maxLeverage)
  })
})
