'use strict';

const openPositionLimit = require('./open_position_limit');
/**
 * Opens a new long position with a limit order
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */


const openLongPositionLimit = (state = {}, orderParams = {}) => {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        return _context.abrupt("return", openPositionLimit(state, orderParams));

      case 1:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = openLongPositionLimit;