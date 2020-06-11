'use strict'

const _isObject = require('lodash/isObject')
const _isFunction = require('lodash/isFunction')

/**
 * Executes the specified function in all strategy indicators, and returns the
 * results in a map matching the indicator map structure.
 *
 * @param {StrategyState} state - strategy state
 * @param {string} fn - function name
 * @returns {object} results
 */
const indicatorsExec = (state = {}, fn = '') => {
  const { indicators = {} } = state
  const results = {}
  const keys = Object.keys(indicators)
  let key, i

  for (let j = 0; j < keys.length; j += 1) {
    key = keys[j]
    i = indicators[key]

    if (_isFunction(i.v)) {
      results[key] = i[fn]()
    } else if (_isObject(i)) {
      results[key] = indicatorsExec({ indicators: i }, fn)
    }
  }

  return results
}

module.exports = indicatorsExec
