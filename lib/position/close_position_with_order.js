'use strict'

const debug = require('debug')('bfx:hf:strategy:position:close-with-order')
const _isObject = require('lodash/isObject')
const _isFunction = require('lodash/isFunction')

const getDefaultSymbol = require('../data/get_default_symbol')
const submitTrade = require('../orders/submit_trade')
const validateOrderParams = require('../orders/validate_order_params')
const updatePositionWithTrade = require('../data/update_position_with_trade')
const positionPL = require('../data/position_pl')
const { execPluginHandler } = require('../plugins')

/**
 * Closes an open position with an order. Throws an error if no position is open
 * for the order's symbol.
 *
 * @memberof module:Positions
 * @throws {Error} Fails if no position is open for the symbol, if the provided
 *   order would not close the position, or if given invalid order parameters
 * @todo track historical positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const closePositionWithOrder = async (state = {}, orderParams = {}) => {
  const { positions, onPositionClose, onOrderFill, backtesting } = state
  const symbol = orderParams.symbol || getDefaultSymbol(state)

  if (!orderParams.symbol) {
    orderParams.symbol = symbol
  }

  const position = positions[symbol]

  if (!_isObject(position)) {
    throw new Error('no position is currently open')
  } else if (position.amount + orderParams.amount !== 0) {
    throw new Error(`order would not close position (pos for ${position.amount})`)
  }

  validateOrderParams(state, orderParams)

  const { o, trade } = await submitTrade(state, orderParams)
  trade.pl = positionPL(position, trade.price)
  updatePositionWithTrade(position, trade) // to be uniform w/ other methods

  if (!backtesting && _isFunction(onOrderFill)) {
    await onOrderFill(state, { order: o, trade })
  }

  if (_isFunction(onPositionClose)) {
    await onPositionClose(state, {
      position,
      order: o,
      trade
    })
  }

  if (!backtesting) {
    debug(
      'CLOSE %s %f @ %f | %s | PL %f',
      symbol, o.amountOrig, o.priceAvg, o.type, trade.pl
    )
  }

  await execPluginHandler(state, 'onOrderSubmit', state, o, trade, position)
  await execPluginHandler(state, 'onPositionclose', state, position, o)

  delete positions[symbol]
  state.trades.push(trade)
}

module.exports = closePositionWithOrder
