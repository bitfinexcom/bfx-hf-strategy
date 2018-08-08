'use strict'

const updatePosition = require('./update_position')

/**
 * @param {Object} state
 * @param {Object} orderParams
 * @return {Object} nextState
 */
module.exports = async (state = {}, orderParams = {}) => {
  return updatePosition(state, orderParams)
}
