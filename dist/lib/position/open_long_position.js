'use strict';

const openPosition = require('./open_position');
/**
 * Alias for openPositon
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */


const openLongPosition = (state = {}, orderParams = {}) => {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        return _context.abrupt("return", openPosition(state, orderParams));

      case 1:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = openLongPosition;