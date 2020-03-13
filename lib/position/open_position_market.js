'use strict'

const { Order } = require('bfx-api-node-models')
const openPosition = require('./open_position')

/**
 * Opens a new position with a market order
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p - resolves to nextState
 * @throws {Error} Fails if a position already exists for the specified symbol
 */
const openPositionMarket = async (state = {}, orderParams = {}) => {
  const { margin } = state

  return openPosition(state, {
    ...orderParams,

    type: margin
      ? Order.type.MARKET
      : Order.type.EXCHANGE_MARKET
  })
}

module.exports = openPositionMarket
