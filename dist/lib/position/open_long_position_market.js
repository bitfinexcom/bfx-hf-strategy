'use strict';

const openPositionMarket = require('./open_position_market');
/**
 * Opens a new long position with a market order
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */


const openLongPositionMarket = (state = {}, orderParams = {}) => {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        return _context.abrupt("return", openPositionMarket(state, orderParams));

      case 1:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = openLongPositionMarket;