'use strict'

const openPosition = require('./open_position')

/**
 * Alias for openPositon
 *
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Object} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  return openPosition(state, orderParams)
}
