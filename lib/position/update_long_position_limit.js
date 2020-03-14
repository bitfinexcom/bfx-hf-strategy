'use strict'

const updatePositionLimit = require('./update_position_limit')

/**
 * Updates a long position with a limit order
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const updateLongPositionLimit = async (state = {}, orderParams = {}) => {
  return updatePositionLimit(state, orderParams)
}

module.exports = updateLongPositionLimit
