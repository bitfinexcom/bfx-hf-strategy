'use strict';

const debug = require('debug')('bfx:hf:strategy:position:open-with-order');

const _isFunction = require('lodash/isFunction');

const getDefaultSymbol = require('../data/get_default_symbol');

const submitTrade = require('../orders/submit_trade');

const createPositionObject = require('./create_position_object');

const validateOrderParams = require('../orders/validate_order_params');

const getPosition = require('../data/get_position');

const _require = require('../plugins'),
      execPluginHandler = _require.execPluginHandler;
/**
 * Submits a new order via ws2 with the supplied parameters, creates a new
 * strategy trade and creates a position.
 *
 * If no ws client is available, no data is saved & no order is dispatched
 *
 * @throws {Error} Fails if a position already exists for the specified symbol
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */


const openPositionWithOrder = (state = {}, orderParams = {}) => {
  var onOrderFill, backtesting, tag, amount, stop, target, symbol, _await$submitTrade, o, trade, position;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        onOrderFill = state.onOrderFill, backtesting = state.backtesting;
        tag = orderParams.tag, amount = orderParams.amount, stop = orderParams.stop, target = orderParams.target;
        symbol = orderParams.symbol || getDefaultSymbol(state);

        if (!orderParams.symbol) {
          orderParams.symbol = symbol;
        }

        if (!(getPosition(state, symbol) !== null)) {
          _context.next = 6;
          break;
        }

        throw new Error(`a position already exists for ${symbol}`);

      case 6:
        validateOrderParams(state, orderParams);
        _context.next = 9;
        return regeneratorRuntime.awrap(submitTrade(state, orderParams));

      case 9:
        _await$submitTrade = _context.sent;
        o = _await$submitTrade.o;
        trade = _await$submitTrade.trade;
        position = createPositionObject(state, {
          symbol,
          amount,
          price: o.priceAvg,
          trades: [trade],
          // for strategyState, not the model
          stop,
          target,
          tag
        });

        if (backtesting) {
          _context.next = 17;
          break;
        }

        if (!_isFunction(onOrderFill)) {
          _context.next = 17;
          break;
        }

        _context.next = 17;
        return regeneratorRuntime.awrap(onOrderFill(state, state, {
          order: o,
          trade
        }));

      case 17:
        if (!backtesting) {
          debug('OPEN %s | %f @ %f | %s', symbol, amount, o.priceAvg, o.type);
        }

        _context.next = 20;
        return regeneratorRuntime.awrap(execPluginHandler(state, 'onOrderSubmit', state, o, trade, position));

      case 20:
        _context.next = 22;
        return regeneratorRuntime.awrap(execPluginHandler(state, 'onPositionOpen', state, position, o));

      case 22:
        state.positions[symbol] = position;
        state.trades.push(trade);

      case 24:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = openPositionWithOrder;