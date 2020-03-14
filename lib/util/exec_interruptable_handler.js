'use strict'

const { ErrorInterruptExec } = require('../errors')

/**
 * Executes the provided handler while safely catching any ErrorInterruptExec
 * errors. Allows for interrupting handler execution early. Syntactical sugar.
 *
 * @memberOf module:Utilities
 *
 * @param {Function} handler - handler
 * @param {*} args - passed directly to handler
 */
const execInterruptableHandler = async (handler, ...args) => {
  try {
    await handler(...args)
  } catch (e) {
    if (!(e instanceof ErrorInterruptExec)) {
      throw e
    }
  }
}

module.exports = execInterruptableHandler
