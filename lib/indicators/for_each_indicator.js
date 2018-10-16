'use strict'

const _isObject = require('lodash/isObject')
const { Indicator } = require('bfx-hf-indicators')

/**
 * Calls the provided function with each indicator on the strategy.
 *
 * @param {Object} state
 * @param {Function} f
 */
const forEachIndicator = (state = {}, f = () => {}) => {
  const { indicators = {} } = state

  for (let key in indicators) {
    f(indicators[key], key)
  }
}

module.exports = forEachIndicator
