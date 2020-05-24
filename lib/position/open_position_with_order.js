'use strict'

const debug = require('debug')('bfx:hf:strategy:position:open-with-order')
const _isFunction = require('lodash/isFunction')

const getDefaultSymbol = require('../data/get_default_symbol')
const submitTrade = require('../orders/submit_trade')
const createPositionObject = require('./create_position_object')
const validateOrderParams = require('../orders/validate_order_params')
const getPosition = require('../data/get_position')
const { execPluginHandler } = require('../plugins')

/**
 * Submits a new order via ws2 with the supplied parameters, creates a new
 * strategy trade and creates a position.
 *
 * If no ws client is available, no data is saved & no order is dispatched
 *
 * @memberof module:Positions
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-hf-strategy.OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 * @throws {Error} Fails if a position already exists for the specified symbol
 */
const openPositionWithOrder = async (state = {}, orderParams = {}) => {
  const { onOrderFill, backtesting } = state
  const { tag, amount, stop, target } = orderParams
  const symbol = orderParams.symbol || getDefaultSymbol(state)

  if (!orderParams.symbol) {
    orderParams.symbol = symbol
  }

  if (getPosition(state, symbol) !== null) {
    throw new Error(`a position already exists for ${symbol}`)
  }

  validateOrderParams(state, orderParams)

  const { o, trade } = await submitTrade(state, orderParams)
  const position = createPositionObject(state, {
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
      await onOrderFill(state, state, {
        order: o,
        trade
      })
    }
  }

  if (!backtesting) {
    debug('OPEN %s | %f @ %f | %s', symbol, amount, o.priceAvg, o.type)
  }

  await execPluginHandler(state, 'onOrderSubmit', state, o, trade, position)
  await execPluginHandler(state, 'onPositionOpen', state, position, o)

  state.positions[symbol] = position
  state.trades.push(trade)
}

module.exports = openPositionWithOrder
