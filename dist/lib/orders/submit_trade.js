'use strict';

const submitOrder = require('./submit_order');

const simulateOrderFill = require('./simulate_order_fill');

const tradeForOrder = require('./trade_for_order');
/**
 * Creates & submits the order, and returns the generated DB trade
 *
 * @param {StrategyState} state - strategy state
 * @param {object|Array|bfx-api-node-models.Order} orderParams - order or order
 *   parameters
 * @returns {object} res - map of order and trade objects
 */


const submitTrade = (state = {}, orderParams = {}) => {
  var ws, backtesting, o, trade, tradeData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        ws = state.ws;
        backtesting = !ws;

        if (backtesting) {
          _context.next = 8;
          break;
        }

        _context.next = 5;
        return regeneratorRuntime.awrap(submitOrder(state, orderParams));

      case 5:
        _context.t0 = _context.sent;
        _context.next = 9;
        break;

      case 8:
        _context.t0 = simulateOrderFill(orderParams);

      case 9:
        o = _context.t0;
        trade = tradeForOrder(state, o, orderParams.label, orderParams.tag);
        tradeData = {
          o,
          trade
        };
        return _context.abrupt("return", tradeData);

      case 13:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = submitTrade;