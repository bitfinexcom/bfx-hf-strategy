'use strict'

const { Order } = require('bitfinex-api-node/lib/models')
const openPosition = require('./open_position')

/**
 * Opens a new position with a limit order
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Object} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  const { margin } = state

  return openPosition(state, {
    ...orderParams,

    type: margin
      ? Order.type.LIMIT
      : Order.type.EXCHANGE_LIMIT
  })
}
