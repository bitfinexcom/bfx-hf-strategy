'use strict';

const _require = require('../errors'),
      ErrorInterruptExec = _require.ErrorInterruptExec;
/**
 * Executes the provided handler while safely catching any ErrorInterruptExec
 * errors. Allows for interrupting handler execution early. Syntactical sugar.
 *
 * @param {Function} handler - handler
 * @param {...(string|number|Array|object)} args - passed directly to handler
 */


const execInterruptableHandler = (handler, ...args) => {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        _context.next = 3;
        return regeneratorRuntime.awrap(handler(...args));

      case 3:
        _context.next = 9;
        break;

      case 5:
        _context.prev = 5;
        _context.t0 = _context["catch"](0);

        if (_context.t0 instanceof ErrorInterruptExec) {
          _context.next = 9;
          break;
        }

        throw _context.t0;

      case 9:
      case "end":
        return _context.stop();
    }
  }, null, null, [[0, 5]], Promise);
};

module.exports = execInterruptableHandler;