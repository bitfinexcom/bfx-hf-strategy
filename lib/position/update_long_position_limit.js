'use strict'

const updatePositionLimit = require('./update_position_limit')

/**
 * Updates a long position with a limit order
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Object} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  return updatePositionLimit(state, orderParams)
}
