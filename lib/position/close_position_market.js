'use strict'

const { Order } = require('bitfinex-api-node/lib/models')
const closePosition = require('./close_position')

/**
 * Closes a position with a market order
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Object} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  const { margin } = state

  return closePosition(state, {
    ...orderParams,

    type: margin
      ? Order.type.MARKET
      : Order.type.EXCHANGE_MARKET
  })
}
