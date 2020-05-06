'use strict'

const openPosition = require('./open_position')

/**
 * Alias for openPositon
 *
 * @memberof module:Positions
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const openLongPosition = async (state = {}, orderParams = {}) => {
  return openPosition(state, orderParams)
}

module.exports = openLongPosition
