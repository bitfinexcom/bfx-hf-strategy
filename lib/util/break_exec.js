'use strict'

const { ErrorInterruptExec } = require('../errors')

/**
 * Throws an error meant to be caught in order to break strategy execution.
 *
 * @memberof module:Utility
 * @private
 *
 * @param {string} message - error message
 * @throws {Error} When called.
 */
const breakExec = message => {
  throw new ErrorInterruptExec(message)
}

module.exports = breakExec
