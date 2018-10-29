'use strict'

const { Order } = require('bfx-api-node-models')
const openPosition = require('./open_position')

/**
 * Opens a new position with a market order
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
      ? Order.type.MARKET
      : Order.type.EXCHANGE_MARKET
  })
}
