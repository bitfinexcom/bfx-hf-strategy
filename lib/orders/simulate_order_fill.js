'use strict'

const { Order } = require('bfx-api-node-models')

/**
 * Simulates a fill for backtests, replaces submitOrder()
 *
 * @param {object} state
 * @param {object} orderParams
 * @param {number} fillAmount - optional, defaults to entire order
 * @return {Order} filledOrder
 */
module.exports = (state = {}, orderParams = {}, fillAmount) => {
  const amountToFill = fillAmount || orderParams.amount
  const {
    amountOrig, amount, price, mtsCreate = Date.now()
  } = orderParams

  if (amountToFill > amount) {
    throw new Error(
      'requested fill greater than order size (%d > %d)',
      amountToFill, amount
    )
  }

  return new Order({
    ...orderParams,
    amount: amount - amountToFill,
    amountOrig: amountOrig || amount,
    priceAvg: price,
    mtsCreate
  })
}
