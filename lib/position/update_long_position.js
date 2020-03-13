'use strict'

const updatePosition = require('./update_position')

/**
 * @param {object} state
 * @param {object} orderParams
 * @return {Promise} p - resolves to nextState
 */
const updateLongPosition = async (state = {}, orderParams = {}) => {
  return updatePosition(state, orderParams)
}

module.exports = updateLongPosition
