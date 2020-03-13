'use strict'

const { Indicator } = require('bfx-hf-indicators')
const _isObject = require('lodash/isObject')

/**
 * Returns the first indicator in the strategy for which the provided function
 * evaluates to true.
 *
 * @memberOf module:Indicators
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {Function} f - called with (indicator, id)
 * @returns {Indicator} i - null if not found
 */
const findIndicator = (state = {}, f = () => {}) => {
  const { indicators = {} } = state
  const keys = Object.keys(indicators)
  let key

  for (let i = 0; i < keys.length; i += 1) {
    key = keys[i]
    i = indicators[key]

    if (i instanceof Indicator) {
      if (f(i, key)) {
        return i
      }
    } else if (_isObject(i)) {
      const nestedI = findIndicator({ indicators: i }, f)

      if (nestedI !== null) {
        return nestedI
      }
    }
  }

  return null
}

module.exports = findIndicator
