'use strict'

const { Indicator } = require('bfx-hf-indicators')
const _isObject = require('lodash/isObject')

/**
 * Executes the specified function in all strategy indicators, and returns the
 * results in a map matching the indicator map structure.
 *
 * @param {Object} strategyState
 * @param {string} fn - function name
 * @return {Object} results
 */
const indicatorsExec = (strategyState = {}, fn = '') => {
  const { indicators = {} } = strategyState
  const results = {}
  const keys = Object.keys(indicators)
  let key, i

  for (let j = 0; j < keys.length; j += 1) {
    key = keys[j]
    i = indicators[key]

    if (i instanceof Indicator) {
      results[key] = i[fn]()
    } else if (_isObject(i)) {
      results[key] = indicatorsExec({ indicators: i }, fn)
    }
  }

  return results
}

module.exports = indicatorsExec
