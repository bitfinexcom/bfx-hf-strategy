'use strict'

const { Order } = require('bitfinex-api-node/lib/models')
const updatePosition = require('./update_position')

/**
 * Updates a position with a limit order
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Object} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  const { margin } = state

  return updatePosition(state, {
    ...orderParams,

    type: margin
      ? Order.type.LIMIT
      : Order.type.EXCHANGE_LIMIT
  })
}
