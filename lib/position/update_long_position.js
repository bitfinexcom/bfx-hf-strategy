'use strict'

const updatePosition = require('./update_position')

/**
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Promise} p - resolves to nextState
 */
const updateLongPosition = async (state = {}, orderParams = {}) => {
  return updatePosition(state, orderParams)
}

module.exports = updateLongPosition
