'use strict'

const { Order } = require('bfx-api-node-models')
const closePosition = require('./close_position')

/**
 * Closes a position with a limit order
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams
 * @returns {Promise} p
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
