'use strict'

const { Order } = require('bfx-api-node-models')
const BigNumber = require('bignumber.js')

/**
 * Simulates a fill for backtests, replaces submitOrder()
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @param {number} fillAmount - optional, defaults to entire order
 * @return {Order} filledOrder
 */
module.exports = (state = {}, orderParams = {}, fillAmount) => {
  const { amountOrig, amount, price, mtsCreate = Date.now() } = orderParams
  const { priceFeed, perfManager } = state
  const amountToFill = fillAmount

  if (amountToFill > amount) {
    throw new Error(
      'requested fill greater than order size (%d > %d)',
      amountToFill, amount
    )
  }

  const orderAmount = amount - amountToFill

  const authorizationError = perfManager.canOpenOrder(
    new BigNumber(orderAmount),
    new BigNumber(price || priceFeed.price)
  )

  if (authorizationError) {
    throw authorizationError
  }

  perfManager.addOrder({
    amount: new BigNumber(orderAmount),
    price: new BigNumber(price || priceFeed.price)
  })

  return new Order({
    ...orderParams,
    amount: orderAmount,
    amountOrig: amountOrig || amount,
    priceAvg: price,
    mtsCreate
  })
}
