/* eslint-disable no-unused-expressions */
/* eslint-env mocha */

const { expect } = require('chai')
const { stub, assert } = require('sinon')
const calculateFees = require('../../../lib/orders/calculate_fees')

describe('calc fees of trade', () => {
  const stubAccountTrades = stub()
  const rest = {
    accountTrades: stubAccountTrades
  }

  afterEach(() => {
    stubAccountTrades.reset()
  })

  const base = 'BTC'
  const quote = 'USD'
  const symbol = base + quote
  const order = {
    id: 103164770121
  }
  const orderParams = {
    symbol,
    submittedAt: 1661799613000
  }

  it('buy', async () => {
    const trade = {
      id: 1197423249,
      symbol,
      mtsCreate: 1661799613496,
      orderID: 103164770121,
      execAmount: 2,
      execPrice: 20190,
      orderType: 'EXCHANGE MARKET',
      orderPrice: 20183,
      maker: false,
      fee: -0.004,
      feeCurrency: base
    }
    stubAccountTrades.resolves([trade])

    const fees = await calculateFees(rest, order, orderParams)

    assert.calledWithExactly(stubAccountTrades, { symbol, start: orderParams.submittedAt })
    expect(fees).not.to.be.null
    expect(fees.amount.toString()).to.be.eq('-0.004')
    expect(fees.cost.toString()).to.be.eq('-80.76')
    expect(fees.currency).to.be.eq(base)
    expect(fees.perc.toString()).to.be.eq('0.002')
    expect(fees.isMaker).to.be.eq(false)
  })

  it('sell', async () => {
    const trade = {
      id: 1197423249,
      symbol,
      mtsCreate: 1661799613496,
      orderID: 103164770121,
      execAmount: -1.996,
      execPrice: 20190,
      orderType: 'EXCHANGE MARKET',
      orderPrice: 20183,
      maker: false,
      fee: -80.59848,
      feeCurrency: quote
    }
    stubAccountTrades.resolves([trade])

    const fees = await calculateFees(rest, order, orderParams)

    assert.calledWithExactly(stubAccountTrades, { symbol, start: orderParams.submittedAt })
    expect(fees).not.to.be.null
    expect(fees.amount.toString()).to.be.eq('-80.59848')
    expect(fees.cost.toString()).to.be.eq('-80.59848')
    expect(fees.currency).to.be.eq(quote)
    expect(fees.perc.toString()).to.be.eq('0.002')
    expect(fees.isMaker).to.be.eq(false)
  })
})
