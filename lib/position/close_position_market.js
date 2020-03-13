'use strict'

const { Order } = require('bfx-api-node-models')
const closePosition = require('./close_position')

/**
 * Closes a position with a market order
 *
 * @param {object} state
 * @param {object} orderParams
 * @return {Promise} p - resolves to nextState
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
