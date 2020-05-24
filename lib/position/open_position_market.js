'use strict'

const _isFinite = require('lodash/isFinite')
const { Order } = require('bfx-api-node-models')
const { safeThrow } = require('../errors')
const openPosition = require('./open_position')
const { getLastPrice, getDefaultSymbol } = require('../data')

/**
 * Opens a new position with a market order. Pulls order timestamp and price
 * from last received data for the order's symbol.
 *
 * @memberof module:Positions
 * @throws {Error} If no timestamp or price data available and none supplied
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-hf-strategy.OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const openPositionMarket = async (state = {}, orderParams = {}) => {
  const { margin } = state
  const {
    price: orderPrice,
    mtsCreate: orderMTS,
    symbol = getDefaultSymbol(state)
  } = orderParams

  const lastPriceData = getLastPrice(state, symbol)
  const price = orderPrice || (lastPriceData || {}).price
  const mts = orderMTS || (lastPriceData || {}).mts

  if (!_isFinite(price)) {
    safeThrow(
      state, 'no price data available and no price supplied on order parameters'
    )
  } else if (!_isFinite(mts)) {
    safeThrow(
      state, 'no last timestamp available and none supplied on order parameters'
    )
  }

  return openPosition(state, {
    ...orderParams,
    price,
    mtsCreate: mts,
    type: margin
      ? Order.type.MARKET
      : Order.type.EXCHANGE_MARKET
  })
}

module.exports = openPositionMarket
