'use strict';

const debug = require('debug')('bfx:hf:strategy:position:close-with-order');

const _isObject = require('lodash/isObject');

const _isFunction = require('lodash/isFunction');

const getDefaultSymbol = require('../data/get_default_symbol');

const submitTrade = require('../orders/submit_trade');

const validateOrderParams = require('../orders/validate_order_params');

const updatePositionWithTrade = require('../data/update_position_with_trade');

const positionPL = require('../data/position_pl');

const _require = require('../plugins'),
      execPluginHandler = _require.execPluginHandler;
/**
 * Closes an open position with an order. Throws an error if no position is open
 * for the order's symbol.
 *
 * @todo track historical positions
 * @throws {Error} Fails if no position is open for the symbol, if the provided
 *   order would not close the position, or if given invalid order parameters
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */


const closePositionWithOrder = (state = {}, orderParams = {}) => {
  var positions, onPositionClose, onOrderFill, backtesting, symbol, position, _await$submitTrade, o, trade;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        positions = state.positions, onPositionClose = state.onPositionClose, onOrderFill = state.onOrderFill, backtesting = state.backtesting;
        symbol = orderParams.symbol || getDefaultSymbol(state);

        if (!orderParams.symbol) {
          orderParams.symbol = symbol;
        }

        position = positions[symbol];

        if (_isObject(position)) {
          _context.next = 8;
          break;
        }

        throw new Error('no position is currently open');

      case 8:
        if (!(position.amount + orderParams.amount !== 0)) {
          _context.next = 10;
          break;
        }

        throw new Error(`order would not close position (pos for ${position.amount})`);

      case 10:
        validateOrderParams(state, orderParams);
        _context.next = 13;
        return regeneratorRuntime.awrap(submitTrade(state, orderParams));

      case 13:
        _await$submitTrade = _context.sent;
        o = _await$submitTrade.o;
        trade = _await$submitTrade.trade;
        trade.pl = positionPL(position, trade.price);
        updatePositionWithTrade(position, trade); // to be uniform w/ other methods

        if (!(!backtesting && _isFunction(onOrderFill))) {
          _context.next = 21;
          break;
        }

        _context.next = 21;
        return regeneratorRuntime.awrap(onOrderFill(state, {
          order: o,
          trade
        }));

      case 21:
        if (!_isFunction(onPositionClose)) {
          _context.next = 24;
          break;
        }

        _context.next = 24;
        return regeneratorRuntime.awrap(onPositionClose(state, {
          position,
          order: o,
          trade
        }));

      case 24:
        if (!backtesting) {
          debug('CLOSE %s %f @ %f | %s | PL %f', symbol, o.amountOrig, o.priceAvg, o.type, trade.pl);
        }

        _context.next = 27;
        return regeneratorRuntime.awrap(execPluginHandler(state, 'onOrderSubmit', state, o, trade, position));

      case 27:
        _context.next = 29;
        return regeneratorRuntime.awrap(execPluginHandler(state, 'onPositionclose', state, position, o));

      case 29:
        delete positions[symbol];
        state.trades.push(trade);

      case 31:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = closePositionWithOrder;