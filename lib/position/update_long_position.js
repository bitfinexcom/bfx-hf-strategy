'use strict'

const updatePosition = require('./update_position')

/**
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p - resolves to nextState
 */
const updateLongPosition = async (state = {}, orderParams = {}) => {
  return updatePosition(state, orderParams)
}

module.exports = updateLongPosition
