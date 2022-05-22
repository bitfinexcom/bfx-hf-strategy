'use strict'

const { cancelOrderByGid } = require('bfx-api-node-core')

const debug = require('debug')('bfx:hf:strategy:position:close-pending-orders')

/**
 * Closes all open positions with market orders
 *
 * @param {Object} state
 * @return {Promise} p - resolves to nextState
 */
const closePendingOrders = async (state = {}) => {
  const { gid, ws, backtesting } = state

  const symbols = Object.keys(state.positions)

  if (!symbols.length) {
    return state
  }

  if (!backtesting) {
    debug(
      'closing %d pending orders [%s]',
      symbols.length, symbols.join(', ')
    )
  }

  await cancelOrderByGid(ws, { gid })

  return state
}

module.exports = closePendingOrders
