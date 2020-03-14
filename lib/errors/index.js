'use strict'

const throwIfOrderClosesPosition = require('./throw_if_order_closes_position.js')
const safeThrow = require('./safe_throw')

/**
 * Error creation and helper methods
 *
 * @module Errors
 */
module.exports = {
  throwIfOrderClosesPosition,
  safeThrow
}
