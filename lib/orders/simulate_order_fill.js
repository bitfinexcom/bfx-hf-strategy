'use strict'

const { Order } = require('bfx-api-node-models')

require('../types/order_parameters')

/**
 * Simulates a fill for backtests, replaces submitOrder()
 *
 * @throws {Error} Fails if the fill amount is larger than the order size
 *
 * @param {OrderParameters} orderParams - order parameters
 * @param {number} [fillAmount] - defaults to entire order
 * @returns {bfx-api-node-models.Order} filledOrder
 */
const simulateOrderFill = (orderParams = {}, fillAmount) => {
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

module.exports = simulateOrderFill
