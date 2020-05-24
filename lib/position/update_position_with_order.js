'use strict'

const debug = require('debug')('bfx:hf:strategy:position:update-with-order')
const _isFunction = require('lodash/isFunction')
const _isObject = require('lodash/isObject')

const getDefaultSymbol = require('../data/get_default_symbol')
const submitTrade = require('../orders/submit_trade')
const getPosition = require('../data/get_position')
const validateOrderParams = require('../orders/validate_order_params')
const throwIfOrderClosesPosition = require('../errors/throw_if_order_closes_position')
const updatePositionWithTrade = require('../data/update_position_with_trade')
const { execPluginHandler } = require('../plugins')

/**
 * Submits a new order via ws2 with the supplied parameters, creates a new
 * strategy trade and updates the current position.
 *
 * If no ws client is available, no data is saved & no order is dispatched
 *
 * @memberof module:Positions
 * @throws {Error} Fails if no position is open for the symbol, if the order
 *   would close the position, or if given invalid order parameters
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-hf-strategy.OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const updatePositionWithOrder = async (state = {}, orderParams = {}) => {
  const { amount } = orderParams
  const { onPositionUpdate, onOrderFill, backtesting } = state
  const symbol = orderParams.symbol || getDefaultSymbol(state)
  const position = getPosition(state, symbol)

  if (!orderParams.symbol) {
    orderParams.symbol = symbol
  }

  if (!_isObject(position)) {
    throw new Error('no position is currently open')
  }

  validateOrderParams(state, orderParams)
  throwIfOrderClosesPosition(state, orderParams)

  const { o, trade } = await submitTrade(state, orderParams)
  updatePositionWithTrade(position, trade)

  if (!backtesting && _isFunction(onOrderFill)) {
    await onOrderFill(state, { order: o, trade })
  }

  if (_isFunction(onPositionUpdate)) {
    await onPositionUpdate(state, {
      position,
      order: o,
      trade
    })
  }

  if (!backtesting) {
    debug(
      'UPDATE %s | delta %f | %f @ %f | %s',
      symbol, amount, position.amount, position.price, o.type
    )
  }

  await execPluginHandler(state, 'onOrderSubmit', state, o, trade, position)
  await execPluginHandler(state, 'onPositionUpdate', state, position, o)

  state.positions[symbol] = position
  state.trades.push(trade)
}

module.exports = updatePositionWithOrder
