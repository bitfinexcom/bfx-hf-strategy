'use strict'

const { cancelOrdersByGid } = require('bfx-api-node-core')

const debug = require('debug')('bfx:hf:strategy:position:close-pending-orders')

/**
 * Closes all open positions with market orders
 *
 * @param {Object} state
 * @return {Promise} p - resolves to nextState
 */
const closePendingOrders = async (state = {}) => {
  const { gid, ws, backtesting } = state

  if (!backtesting) {
    debug('closing pending orders [gid, %s]', gid)
  }

  await cancelOrdersByGid(ws, { gid })

  return state
}

module.exports = closePendingOrders
