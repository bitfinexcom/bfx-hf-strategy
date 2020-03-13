'use strict'

const openPositionLimit = require('./open_position_limit')

/**
 * Opens a new long position with a limit order
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams
 * @returns {Promise} p - resolves to nextState
 */
const openLongPositionLimit = async (state = {}, orderParams = {}) => {
  return openPositionLimit(state, orderParams)
}

module.exports = openLongPositionLimit
