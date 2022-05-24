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

  if (backtesting) {
    return state
  }

  debug('closing pending orders [gid, %s]', gid)

  try {
    await cancelOrdersByGid(ws, { gid })
  } catch (err) {
    debug('error on cancel orders by gid: %s (gid: %d)', err.message, gid)
  }

  return state
}

module.exports = closePendingOrders
