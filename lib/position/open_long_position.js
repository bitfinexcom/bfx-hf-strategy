'use strict'

const openPosition = require('./open_position')

/**
 * Alias for openPositon
 *
 * @param {object} state
 * @param {object} orderParams
 * @return {Promise} p - resolves to nextState
 */
const openLongPosition = async (state = {}, orderParams = {}) => {
  return openPosition(state, orderParams)
}

module.exports = openLongPosition
