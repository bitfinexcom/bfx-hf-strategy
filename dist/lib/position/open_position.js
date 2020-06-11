'use strict';

const openPositionWithOrder = require('./open_position_with_order');
/**
 * Opens a position with a new order; resolves to an error if a position is
 * already open.
 *
 * @throws {Error} Fails if a position already exists for the specified symbol
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - passed directly to order constructor
 * @returns {Promise} p
 */


const openPosition = (state = {}, orderParams = {}) => {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        return _context.abrupt("return", openPositionWithOrder(state, orderParams));

      case 1:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = openPosition;