'use strict';

const updatePositionWithOrder = require('./update_position_with_order');
/**
 * Alias for updatePositionWithOrder
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - passed directly to order constructor
 * @returns {Promise} p
 */


const updatePosition = (state = {}, orderParams = {}) => {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        return _context.abrupt("return", updatePositionWithOrder(state, orderParams));

      case 1:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = updatePosition;