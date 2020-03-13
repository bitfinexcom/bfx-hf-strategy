'use strict'

const submitOrder = require('./submit_order')
const simulateOrderFill = require('./simulate_order_fill')
const tradeForOrder = require('./trade_for_order')

/**
 * Creates & submits the order, and returns the generated DB trade
 *
 * @memberOf module:Orders
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {object|Array|Order} orderParams - order to generate parameters or
 *   order parameters themselves
 * @returns {object} res - map of order and trade objects
 */
const submitTrade = async (state = {}, orderParams = {}) => {
  const { ws } = state
  const backtesting = !ws

  const o = !backtesting
    ? await submitOrder(state, orderParams)
    : simulateOrderFill(orderParams)

  const trade = tradeForOrder(state, o, orderParams.label, orderParams.tag)
  const tradeData = { o, trade }

  return tradeData
}

module.exports = submitTrade
