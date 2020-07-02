'use strict';

const debug = require('debug')('bfx:hf:strategy:position:update-with-order');

const _isFunction = require('lodash/isFunction');

const _isObject = require('lodash/isObject');

const getDefaultSymbol = require('../data/get_default_symbol');

const submitTrade = require('../orders/submit_trade');

const getPosition = require('../data/get_position');

const validateOrderParams = require('../orders/validate_order_params');

const throwIfOrderClosesPosition = require('../errors/throw_if_order_closes_position');

const updatePositionWithTrade = require('../data/update_position_with_trade');

const _require = require('../plugins'),
      execPluginHandler = _require.execPluginHandler;
/**
 * Submits a new order via ws2 with the supplied parameters, creates a new
 * strategy trade and updates the current position.
 *
 * If no ws client is available, no data is saved & no order is dispatched
 *
 * @throws {Error} Fails if no position is open for the symbol, if the order
 *   would close the position, or if given invalid order parameters
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */


const updatePositionWithOrder = (state = {}, orderParams = {}) => {
  var amount, onPositionUpdate, onOrderFill, backtesting, symbol, position, _await$submitTrade, o, trade;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        amount = orderParams.amount;
        onPositionUpdate = state.onPositionUpdate, onOrderFill = state.onOrderFill, backtesting = state.backtesting;
        symbol = orderParams.symbol || getDefaultSymbol(state);
        position = getPosition(state, symbol);

        if (!orderParams.symbol) {
          orderParams.symbol = symbol;
        }

        if (_isObject(position)) {
          _context.next = 7;
          break;
        }

        throw new Error('no position is currently open');

      case 7:
        validateOrderParams(state, orderParams);
        throwIfOrderClosesPosition(state, orderParams);
        _context.next = 11;
        return regeneratorRuntime.awrap(submitTrade(state, orderParams));

      case 11:
        _await$submitTrade = _context.sent;
        o = _await$submitTrade.o;
        trade = _await$submitTrade.trade;
        updatePositionWithTrade(position, trade);

        if (!(!backtesting && _isFunction(onOrderFill))) {
          _context.next = 18;
          break;
        }

        _context.next = 18;
        return regeneratorRuntime.awrap(onOrderFill(state, {
          order: o,
          trade
        }));

      case 18:
        if (!_isFunction(onPositionUpdate)) {
          _context.next = 21;
          break;
        }

        _context.next = 21;
        return regeneratorRuntime.awrap(onPositionUpdate(state, {
          position,
          order: o,
          trade
        }));

      case 21:
        if (!backtesting) {
          debug('UPDATE %s | delta %f | %f @ %f | %s', symbol, amount, position.amount, position.price, o.type);
        }

        _context.next = 24;
        return regeneratorRuntime.awrap(execPluginHandler(state, 'onOrderSubmit', state, o, trade, position));

      case 24:
        _context.next = 26;
        return regeneratorRuntime.awrap(execPluginHandler(state, 'onPositionUpdate', state, position, o));

      case 26:
        state.positions[symbol] = position;
        state.trades.push(trade);

      case 28:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = updatePositionWithOrder;