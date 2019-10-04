'use strict'

const openPositionLimit = require('./open_position_limit')

/**
 * Opens a new long position with a limit order
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Promise} p - resolves to nextState
 */
const openLongPositionLimit = async (state = {}, orderParams = {}) => {
  return openPositionLimit(state, orderParams)
}

module.exports = openLongPositionLimit
