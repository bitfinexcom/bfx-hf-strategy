'use strict'

const { Order } = require('bfx-api-node-models')
const openPosition = require('./open_position')
const { getLastPrice, getDefaultSymbol } = require('../data')

/**
 * Opens a new position with a limit order
 *
 * @memberof module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 * @throws {Error} Fails if a position already exists for the specified symbol
 */
const openPositionLimit = async (state = {}, orderParams = {}) => {
  const { margin } = state
  const {
    mtsCreate: orderMTS,
    symbol = getDefaultSymbol(state)
  } = orderParams

  const lastPriceData = getLastPrice(state, symbol)
  const mts = orderMTS || (lastPriceData || {}).mts

  return openPosition(state, {
    ...orderParams,
    mtsCreate: mts,
    type: margin
      ? Order.type.LIMIT
      : Order.type.EXCHANGE_LIMIT
  })
}

module.exports = openPositionLimit
