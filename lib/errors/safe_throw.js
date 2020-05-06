'use strict'

const debug = require('debug')('bfx:hf:strategy:errors:safe-throw')
const _isError = require('lodash/isError')

/**
 * Throws the error if backtesting, logs it otherwise.
 *
 * @memberof module:Errors
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {string|Error} error - error, can be a string or an Error instance
 */
const safeThrow = (state, error) => {
  const { backtesting } = state
  const err = _isError(error) ? error : new Error(error)

  if (backtesting) {
    throw err
  } else {
    debug('error: %s', err.message)
  }
}

module.exports = safeThrow
