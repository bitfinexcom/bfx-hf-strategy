'use strict'

const { Order } = require('bfx-api-node-models')
const openPosition = require('./open_position')

/**
 * Opens a new position with a market order
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Promise} p - resolves to nextState
 */
const openPositionMarket = async (state = {}, orderParams = {}) => {
  const { margin, isDerivative } = state

  return openPosition(state, {
    ...orderParams,

    type: margin || isDerivative
      ? Order.type.MARKET
      : Order.type.EXCHANGE_MARKET
  })
}

module.exports = openPositionMarket
