'use strict'

const getPosition = require('../data/get_position')
const tradeForOrder = require('../orders/trade_for_order')
const calculateFees = require('../orders/calculate_fees')
const updatePositionWithTrade = require('../data/update_position_with_trade')
const debug = require('debug')('bfx:hf:strategy:updates:on-order')
const updateStateOnClose = require('../position/update_state_on_close')
const { STOP_ORDER_TYPE } = require('../constants')

/**
 * Called for a closed order
 *
 * @param {Object} state
 * @param {Object} order
 * @return {Promise} p - resolves to nextState
 */
const onOrder = async (state = {}, order = {}) => {
  // check if stop order linked to the position is filled
  if (order.type !== STOP_ORDER_TYPE || order.amount !== 0) {
    return state
  }

  const symbol = order.symbol
  const position = getPosition(state, symbol)
  if (!position || !position.stopLossOrder || position.stopLossOrder.id !== order.id) {
    return state
  }

  debug('stop order filled')

  const { perfManager, rest } = state

  const fees = await calculateFees(rest, order, { symbol, submittedAt: order.mtsCreate }, state)
  const trade = tradeForOrder(state, order, {}, fees)

  const positionData = updatePositionWithTrade(position, trade)
  positionData.closingPrice = trade.price
  positionData.closedAt = Date.now()
  positionData.stopLossOrder = null

  const { amountOrig, price } = order
  perfManager.addOrder(amountOrig, price, position.leverage)

  return await updateStateOnClose(state, order, trade, positionData, symbol)
}

module.exports = onOrder
