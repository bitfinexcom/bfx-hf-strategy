'use strict'

const debug = require('debug')('bfx:hf:strategy:position:close-with-order')
const _isObject = require('lodash/isObject')

const getDefaultSymbol = require('../data/get_default_symbol')
const submitTrade = require('../orders/submit_trade')
const validateOrderParams = require('../orders/validate_order_params')
const updatePositionWithTrade = require('../data/update_position_with_trade')
const { cancelOrder } = require('bfx-api-node-core')
const updateStateOnClose = require('./update_state_on_close')

/**
 * Closes an open position with an order. Throws an error if no position is open
 * for the order's symbol.
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Promise} p - resolves to nextState
 */
const closePositionWithOrder = async (state = {}, orderParams = {}) => {
  const { positions, backtesting, isDerivative, ws } = state
  const symbol = orderParams.symbol || getDefaultSymbol(state)

  if (!orderParams.symbol) {
    orderParams.symbol = symbol
  }

  const { [symbol]: prevPosition } = positions

  if (!_isObject(prevPosition)) {
    throw new Error('no position is currently open')
  } else if (prevPosition.amount + orderParams.amount !== 0) {
    throw new Error(`order would not close position (pos for ${prevPosition.amount})`)
  }

  // set order leverage if derivative
  if (isDerivative && prevPosition.leverage) {
    orderParams.lev = prevPosition.leverage
  }

  validateOrderParams(state, orderParams)

  const nextState = state
  const { order, trade } = await submitTrade(nextState, orderParams)

  const positionData = updatePositionWithTrade(prevPosition, trade)
  positionData.closingPrice = trade.price
  positionData.closedAt = Date.now()

  // cancel stop order for derivative position
  const stopLossOrder = positionData.stopLossOrder
  if (isDerivative && stopLossOrder) {
    try {
      if (!backtesting) {
        await cancelOrder(ws, stopLossOrder)
      }
      positionData.stopLossOrder = null
    } catch (e) {
      debug('error cancelling stop order', e)
      throw e
    }
  }

  return await updateStateOnClose(nextState, order, trade, positionData, symbol)
}

module.exports = closePositionWithOrder
