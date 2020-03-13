'use strict'

const { Order } = require('bfx-api-node-models')
const updatePosition = require('./update_position')

/**
 * Updates a position with a limit order
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p - resolves to nextState
 */
const updatePositionLimit = async (state = {}, orderParams = {}) => {
  const { margin } = state

  return updatePosition(state, {
    ...orderParams,

    type: margin
      ? Order.type.LIMIT
      : Order.type.EXCHANGE_LIMIT
  })
}

module.exports = updatePositionLimit
