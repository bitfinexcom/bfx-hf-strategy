'use strict'

const forEachIndicator = require('./for_each_indicator')

/**
 * Resets all of the strategy's indicators
 *
 * @param {Object} state - strategy state
 */
module.exports = (state = {}) => {
  forEachIndicator(state, i => i.reset())
}
