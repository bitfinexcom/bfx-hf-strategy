'use strict'

const { Order } = require('bfx-api-node-models')
const openPosition = require('./open_position')

/**
 * Opens a new position with a limit order
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams
 * @returns {Promise} p - resolves to nextState
 * @throws {Error} Fails if a position already exists for the specified symbol
 */
const openPositionLimit = async (state = {}, orderParams = {}) => {
  const { margin } = state

  return openPosition(state, {
    ...orderParams,

    type: margin
      ? Order.type.LIMIT
      : Order.type.EXCHANGE_LIMIT
  })
}

module.exports = openPositionLimit
