'use strict'

const submitOrder = require('./submit_order')
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
  const { ws, dbc } = state
  const backtesting = !ws

  const o = !backtesting
    ? await submitOrder(state, orderParams)
    : simulateOrderFill(state, orderParams)

  const trade = tradeForOrder(state, o, orderParams.label, orderParams.tag)
  const tradeData = { o, trade }

  // TODO: DB connector
  // await dbc.createStrategyTrade(state, tradeData)

  return tradeData
}
