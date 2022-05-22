'use strict'

const debug = require('debug')('bfx:hf:strategy:position:close-pending-orders')

/**
 * Closes all open positions with market orders
 *
 * @param {Object} state
 * @return {Promise} p - resolves to nextState
 */
const closePendingOrders = async (state = {}) => {
  return state
}

module.exports = closePendingOrders
