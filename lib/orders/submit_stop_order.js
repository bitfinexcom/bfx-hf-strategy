'use strict'

const debug = require('debug')('bfx:hf:strategy:orders:submit-stop')
const submitOrder = require('./submit_order')
const simulateOrderFill = require('./simulate_order_fill')
const { STOP_ORDER_TYPE } = require('../constants')
const BigNumber = require('bignumber.js')

/**
 * @param {Object} state
 * @param {Object} orderParams
 * @param {Number} fillPrice
 * @return {Promise} p - resolves to Order object
 */
module.exports = async (state = {}, orderParams = {}, fillPrice) => {
  const { simulateFill, backtesting, stopOrderPercent } = state
  const { amount } = orderParams

  const stopLossOrder = { ...orderParams }
  stopLossOrder.type = STOP_ORDER_TYPE
  stopLossOrder.amount = amount * -1 // stop order added for opposite side

  // calculate stop order price
  const price = new BigNumber(fillPrice)
  const orderPercent = new BigNumber(stopOrderPercent)
  const stopLossPriceDiff = price.multipliedBy(orderPercent.dividedBy(100))
  const orderPrice = amount > 0 ? price.minus(stopLossPriceDiff) : price.plus(stopLossPriceDiff)
  stopLossOrder.price = orderPrice.toNumber()

  try {
    if (simulateFill || backtesting) {
      return simulateOrderFill(state, stopLossOrder)
    }

    return await submitOrder(state, stopLossOrder, false)
  } catch (err) {
    debug('error submitting stop order', err)
    throw err
  }
}
