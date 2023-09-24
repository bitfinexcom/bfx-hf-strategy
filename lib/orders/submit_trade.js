'use strict'

const _submitOrder = require('./submit_order')
const simulateOrderFill = require('./simulate_order_fill')
const tradeForOrder = require('./trade_for_order')
const calculateFees = require('./calculate_fees')

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
    perfManager,
    rest
  } = state

  // backwards compat
  if (backtesting !== true && backtesting !== false) {
    backtesting = !ws
  }

  let order, fees

  if (simulateFill || backtesting) {
    order = simulateOrderFill(state, orderParams)
  } else {
    orderParams.submittedAt = Date.now()
    order = await submitOrder(state, orderParams)
    fees = await calculateFees(rest, order, orderParams, state)
  }

  const { amountOrig, price } = order
  perfManager.addOrder(amountOrig, price, orderParams.lev)

  const trade = tradeForOrder(state, order, orderParams, fees)

  return { order, trade }
}
