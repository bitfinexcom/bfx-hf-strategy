'use strict'

const debug = require('debug')('hf:strat:open-position')
const _isFunction = require('lodash/isFunction')

const getDefaultSymbol = require('../data/get_default_symbol')
const submitTrade = require('../orders/submit_trade')
const createPositionObject = require('./create_position_object')
const validateOrderParams = require('../orders/validate_order_params')
const getPosition = require('../data/get_position')

/**
 * Submits a new order via ws2 with the supplied parameters, creates a new
 * strategy trade and creates a position.
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
  const { ws, onPositionOpen, onOrderFill } = state
  const { tag, amount, stop, target } = orderParams
  const symbol = orderParams.symbol || getDefaultSymbol(state)
  const backtesting = !ws

  if (!orderParams.symbol) {
    orderParams.symbol = symbol
  }

  if (getPosition(state, symbol) !== null) {
    throw new Error(`a position already exists for ${symbol}`)
  }

  validateOrderParams(state, orderParams)

  let nextState = state
  const { o, trade } = await submitTrade(nextState, orderParams)
  const positionData = createPositionObject(nextState, {
    symbol,
    amount,
    price: o.priceAvg,
    trades: [trade], // for strategyState, not the model
    stop,
    target,
    tag
  })

  if (!backtesting) {
    if (_isFunction(onOrderFill)) {
      nextState = await onOrderFill(nextState, {
        order: o,
        trade
      })
    }
  }

  if (_isFunction(onPositionOpen)) {
    nextState = await onPositionOpen(nextState, {
      position: positionData,
      order: o,
      trade
    })
  }

  debug('OPEN %s | %f @ %f | %s', symbol, amount, o.priceAvg, o.type)

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
