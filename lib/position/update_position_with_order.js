'use strict'

const debug = require('debug')('hf:strat:update-position')
const _isFunction = require('lodash/isFunction')

const getDefaultSymbol = require('../data/get_default_symbol')
const submitTrade = require('../orders/submit_trade')
const getPosition = require('../data/get_position')
const validateOrderParams = require('../orders/validate_order_params')
const throwIfOrderClosesPosition = require('../errors/throw_if_order_closes_position')
const updatePositionWithTrade = require('../data/update_position_with_trade')

/**
 * Submits a new order via ws2 with the supplied parameters, creates a new
 * strategy trade and updates the current position.
 *
 * If no ws client is available, no data is saved & no order is dispatched
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @param {string} orderParams.symbol
 * @param {string} orderParams.type
 * @param {number} orderParams.amount
 * @return {Objct} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams
  const { onPositionUpdate, onOrderFill, backtesting } = state
  const symbol = orderParams.symbol || getDefaultSymbol(state)

  if (!orderParams.symbol) {
    orderParams.symbol = symbol
  }

  validateOrderParams(state, orderParams)
  throwIfOrderClosesPosition(state, orderParams)

  let nextState = state
  const position = getPosition(nextState, symbol)
  const { o, trade } = await submitTrade(nextState, orderParams)
  const positionData = updatePositionWithTrade(position, trade)

  if (!backtesting) {
    if (_isFunction(onOrderFill)) {
      nextState = await onOrderFill(nextState, {
        order: o,
        trade
      })
    }
  }

  if (_isFunction(onPositionUpdate)) {
    nextState = await onPositionUpdate(nextState, {
      position: positionData,
      order: o,
      trade
    })
  }

  if (!backtesting) {
    debug(
      'UPDATE %s | delta %f | %f @ %f | %s',
      symbol, amount, positionData.amount, positionData.price, o.type
    )
  }

  return {
    ...nextState,

    positions: {
      ...nextState.positions,
      [symbol]: positionData
    },

    trades: [
      ...nextState.trades,
      trade
    ]
  }
}
