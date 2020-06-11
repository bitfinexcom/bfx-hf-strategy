'use strict';

const _require = require('../util'),
      exec = _require.execInterruptableHandler;

const _require2 = require('../plugins'),
      execPluginHandler = _require2.execPluginHandler;
/**
 * Passes the incoming price update to the relevant strategy lifecycle methods.
 *
 * @param {StrategyState} state - strategy state
 * @param {object} update - incoming price update
 * @returns {Promise} p
 */


const onPriceUpdate = (state = {}, update = {}) => {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return regeneratorRuntime.awrap(execPluginHandler(state, 'onPriceUpdate', state, update));

      case 2:
        return _context.abrupt("return", exec(state.exec, state, update));

      case 3:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = onPriceUpdate;