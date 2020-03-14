'use strict'

const _isFinite = require('lodash/isFinite')
const { safeThrow } = require('../errors')

/**
 * Evaluates an arbitrary condition between two literal values.
 *
 * @memberOf module:Utilities
 * @private
 * @throws {Error} Fails if given a non-numeric parameter. Logs an error if
 *   executing live.
 *
 * @param {StrategyState} state - strategy state
 * @param {number} a - left value
 * @param {string} condition - one of (=, ==, eq), (!=, !==, neq), (>, gt),
 *   (>=, gte), (<, lt), or (<=, lte)
 * @param {number} b - right value
 * @returns {boolean} result
 */
const evaluateCondition = (state, a, condition, b) => {
  if (!_isFinite(a)) {
    safeThrow(state, `condition given non-numeric parameter A: ${a}`)
    return
  } else if (!_isFinite(b)) {
    safeThrow(state, `condition given non-numeric parameter B: ${b}`)
    return
  }

  switch (condition) {
    case '=':
    case '==':
    case 'eq':
      return a === b

    case '!=':
    case '!==':
    case 'neq':
      return a !== b

    case '>':
    case 'gt':
      return a > b

    case '>=':
    case 'gte':
      return a >= b

    case '<':
    case 'lt':
      return a < b

    case '<=':
    case 'lte':
      return a <= b

    default:
      safeThrow(strategy, `unknown condition: ${condition}`)
      return false
  }
}

module.exports = evaluateCondition
