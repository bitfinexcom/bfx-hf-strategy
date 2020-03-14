'use strict'

const throwIfOrderClosesPosition = require('./throw_if_order_closes_position.js')
const ErrorInterruptExec = require('./error_interrupt_exec')
const safeThrow = require('./safe_throw')

/**
 * Error creation and helper methods
 *
 * @module Errors
 * @private
 */
module.exports = {
  throwIfOrderClosesPosition,
  ErrorInterruptExec,
  safeThrow
}
