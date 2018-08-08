'use strict'

const submitOrder = require('./submit_order')
const simulateOrderFill = require('./simulate_order_fill')
const createTradeForOrder = require('../trades/create_trade_for_order')
const createRawTradeForOrder = require('../trades/create_raw_trade_for_order')

/**
 * Creates & submits the order, and returns the generated DB trade
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Object} res - map of order and trade objects
 */
module.exports = async (state = {}, orderParams = {}) => {
  const { backtesting } = state

  const o = !backtesting
    ? await submitOrder(state, orderParams)
    : simulateOrderFill(state, orderParams)

  const trade = !backtesting
    ? await createTradeForOrder(state, o, orderParams.label)
    : createRawTradeForOrder(state, o, orderParams.label)

  return { o, trade }
}
