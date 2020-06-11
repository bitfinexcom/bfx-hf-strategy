'use strict';

const _require = require('../errors'),
      ErrorInterruptExec = _require.ErrorInterruptExec;
/**
 * Throws an error meant to be caught in order to break strategy execution.
 *
 * @private
 *
 * @param {string} message - error message
 * @throws {Error} When called.
 */


const breakExec = message => {
  throw new ErrorInterruptExec(message);
};

module.exports = breakExec;