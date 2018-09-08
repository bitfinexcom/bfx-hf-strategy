'use strict'

const findIndicator = require('./find_indicator')

/**
 * Checks if all indicators have been marked as ready (seed period fulfilled)
 *
 * @param {Object} state
 * @return {boolean} ready - true if all indicators are ready
 */
module.exports = (state = {}) => {
  return findIndicator(state, i => !i.ready()) === null
}
