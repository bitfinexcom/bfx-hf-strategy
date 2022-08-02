'use strict'

const { Order } = require('bfx-api-node-models')

/**
 * Simulates a fill for backtests, replaces submitOrder()
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @param {number | null} fillAmount - optional, defaults to entire order
 * @return {Order} filledOrder
 */
module.exports = (state = {}, orderParams = {}, fillAmount = null) => {
  const { amountOrig, amount, price, mtsCreate = Date.now() } = orderParams
  const { priceFeed, perfManager } = state
  const amountToFill = fillAmount || amount

  if (amountToFill > amount) {
    throw new Error(`requested fill greater than order size (${amountToFill} > ${amount})`)
  }

  const authorizationError = perfManager.canOpenOrder(amount, price || priceFeed.price)

  if (authorizationError) {
    throw authorizationError
  }

  return new Order({
    ...orderParams,
    amount: amount - amountToFill,
    amountOrig: amountOrig || amount,
    priceAvg: price,
    mtsCreate
  })
}
