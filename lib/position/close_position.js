'use strict'

const _isObject = require('lodash/isObject')
const closePositionWithOrder = require('./close_position_with_order')
const getDefaultSymbol = require('../data/get_default_symbol')
const getPosition = require('../data/get_position')

/**
 * Closes an open position with an order. Throws an error if no position is open
 * for the order's symbol.
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Promise} p - resolves to nextState
 */
const closePosition = async (state = {}, orderParams = {}) => {
  const {
    symbol = getDefaultSymbol(state)
  } = orderParams

  const pos = getPosition(state, symbol)

  if (!_isObject(pos)) {
    throw new Error(`no position exists for ${symbol}`)
  }

  return closePositionWithOrder(state, {
    ...orderParams,
    amount: pos.amount * -1
  })
}

module.exports = closePosition
