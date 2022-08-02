'use strict'

const _submitOrder = require('./submit_order')
const simulateOrderFill = require('./simulate_order_fill')
const tradeForOrder = require('./trade_for_order')

/**
 * Creates & submits the order, and returns the generated DB trade
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Object} res - map of order and trade objects
 */
module.exports = async (state = {}, orderParams = {}) => {
  let {
    ws,
    backtesting,
    submitOrder = _submitOrder,
    simulateFill,
    perfManager
  } = state

  // backwards compat
  if (backtesting !== true && backtesting !== false) {
    backtesting = !ws
  }

  let order

  if (simulateFill || backtesting) {
    order = simulateOrderFill(state, orderParams)
  } else {
    order = await submitOrder(state, orderParams)
  }

  const { amountOrig, price } = order
  perfManager.addOrder(amountOrig, price)

  const trade = tradeForOrder(state, order, orderParams.label, orderParams.tag)

  return { order, trade }
}
