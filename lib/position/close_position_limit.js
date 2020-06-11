'use strict'

const { Order } = require('bfx-api-node-models')
const closePosition = require('./close_position')
const { getLastPrice, getDefaultSymbol } = require('../data')

/**
 * Closes a position with a limit order
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const closePositionLimit = async (state = {}, orderParams = {}) => {
  const { margin } = state
  const {
    mtsCreate: orderMTS,
    symbol = getDefaultSymbol(state)
  } = orderParams

  const lastPriceData = getLastPrice(state, symbol)
  const mts = orderMTS || (lastPriceData || {}).mts

  return closePosition(state, {
    ...orderParams,
    mtsCreate: mts,
    type: margin
      ? Order.type.LIMIT
      : Order.type.EXCHANGE_LIMIT
  })
}

module.exports = closePositionLimit
