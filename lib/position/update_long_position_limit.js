'use strict'

const updatePositionLimit = require('./update_position_limit')

/**
 * Updates a long position with a limit order
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Promise} p - resolves to nextState
 */
const updateLongPositionLimit = async (state = {}, orderParams = {}) => {
  return updatePositionLimit(state, orderParams)
}

module.exports = updateLongPositionLimit
