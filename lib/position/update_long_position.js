'use strict'

const updatePosition = require('./update_position')

/**
 *
 * @memberof module:Positions
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-hf-strategy.OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */
const updateLongPosition = async (state = {}, orderParams = {}) => {
  return updatePosition(state, orderParams)
}

module.exports = updateLongPosition
