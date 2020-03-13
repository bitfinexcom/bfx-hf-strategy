'use strict'

const openPosition = require('./open_position')

/**
 * Alias for openPositon
 *
 * @memberOf module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams
 * @returns {Promise} p - resolves to nextState
 */
const openLongPosition = async (state = {}, orderParams = {}) => {
  return openPosition(state, orderParams)
}

module.exports = openLongPosition
