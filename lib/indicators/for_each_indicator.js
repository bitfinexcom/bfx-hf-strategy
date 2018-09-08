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
  const keys = Object.keys(indicators)
  let i

  keys.forEach(key => {
    i = indicators[key]

    if (i instanceof Indicator) {
      f(i, key)
    } else if (_isObject(i)) {
      forEachIndicator({ indicators: i }, f)
    }
  })
}

module.exports = forEachIndicator
