'use strict'

const { Order } = require('bfx-api-node-models')
const closePosition = require('./close_position')

/**
 * Closes a position with a market order
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const closePositionMarket = async (state = {}, orderParams = {}) => {
  const { margin } = state

  return closePosition(state, {
    ...orderParams,

    type: margin
      ? Order.type.MARKET
      : Order.type.EXCHANGE_MARKET
  })
}

module.exports = closePositionMarket
