'use strict'

const validateOrderParams = require('./validate_order_params.js')
const simulateOrderFill = require('./simulate_order_fill.js')
const submitOrder = require('./submit_order.js')
const submitTrade = require('./submit_trade.js')

/**
 * Order manipulation methods
 *
 * @module Orders
 * @private
 */
module.exports = {
  simulateOrderFill,
  submitOrder,
  submitTrade,
  validateOrderParams
}
