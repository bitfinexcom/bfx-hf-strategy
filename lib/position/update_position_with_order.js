'use strict'

const debug = require('debug')('hf:strat:update-position')
const _isFunction = require('lodash/isFunction')

const getDefaultSymbol = require('../data/get_default_symbol')
const submitTrade = require('../orders/submit_trade')
const updatePositionModel = require('../model/update_position_model')
const getPosition = require('../data/get_position')
const updateTradeForPosition = require('../trades/update_trade_for_position')
const validateOrderParams = require('../orders/validate_order_params')
const throwIfOrderClosesPosition = require('../errors/throw_if_order_closes_position')
const updatePositionWithTrade = require('../data/update_position_with_trade')

/**
 * Submits a new order via ws2 with the supplied parameters, creates a new
 * strategy trade and updates the current position.
 *
 * If backtesting, no data is saved & no order is dispatched, but state is
 * updated as usual.
 *
 * @param {Object} state
 * @param {boolean} state.backtesting - if true, no data is sent or saved
 * @param {Object} orderParams
 * @param {string} orderParams.symbol
 * @param {string} orderParams.type
 * @param {number} orderParams.amount
 * @return {Objct} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  const { backtesting, onPositionUpdate, onOrderFill } = state
  const { amount } = orderParams
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

    const positionModel = await updatePositionModel(nextState, positionData)
    await updateTradeForPosition(nextState, trade, positionModel)
  }

  if (_isFunction(onPositionUpdate)) {
    nextState = await onPositionUpdate(nextState, {
      position: positionData,
      order: o,
      trade
    })
  }

  debug(
    'UPDATE %s | delta %f | %f @ %f | %s',
    symbol, amount, positionData.amount, positionData.price, o.type
  )

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
