'use strict'

const openPosition = require('./open_position')

/**
 * Alias for openPositon
 *
 * @memberof module:Positions
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-hf-strategy.OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const openLongPosition = async (state = {}, orderParams = {}) => {
  return openPosition(state, orderParams)
}

module.exports = openLongPosition
