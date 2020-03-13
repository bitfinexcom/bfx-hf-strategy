'use strict'

const { Order } = require('bfx-api-node-models')
const updatePosition = require('./update_position')

/**
 * Updates a new position with a market order
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p - resolves to nextState
 */
const updatePositionMarket = async (state = {}, orderParams = {}) => {
  const { margin } = state

  return updatePosition(state, {
    ...orderParams,

    type: margin
      ? Order.type.MARKET
      : Order.type.EXCHANGE_MARKET
  })
}

module.exports = updatePositionMarket
