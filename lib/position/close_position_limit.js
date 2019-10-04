'use strict'

const { Order } = require('bfx-api-node-models')
const closePosition = require('./close_position')

/**
 * Closes a position with a limit order
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Promise} p - resolves to nextState
 */
const closePositionLimit = async (state = {}, orderParams = {}) => {
  const { margin } = state

  return closePosition(state, {
    ...orderParams,

    type: margin
      ? Order.type.LIMIT
      : Order.type.EXCHANGE_LIMIT
  })
}

module.exports = closePositionLimit
