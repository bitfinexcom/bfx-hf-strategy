'use strict'

/**
 * Error meant to be caught safely when thrown, in order to interrupt flow
 *
 * @memberof module:Errors
 * @private
 */
class ErrorInterruptExec extends Error {
  constructor (message) {
    super(message)
    this.name = 'ErrorInterruptExec'
  }
}

module.exports = ErrorInterruptExec
