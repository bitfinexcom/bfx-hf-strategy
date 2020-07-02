'use strict';

const _isEmpty = require('lodash/isEmpty');

const debug = require('debug')('bfx:hf:strategy:position:close-all-open');

const closePositionMarket = require('./close_position_market');

const getLastPrice = require('../data/get_last_price');

const getPosition = require('../data/get_position');
/**
 * Closes all open positions with market orders
 *
 * @param {StrategyState} state - strategy state
 * @returns {Promise} p
 */


const closeOpenPositions = (state = {}) => {
  var backtesting, symbols, symbol, i, p, lastPrice, mts, price;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        backtesting = state.backtesting;
        symbols = Object.keys(state.positions);

        if (!_isEmpty(symbols)) {
          _context.next = 4;
          break;
        }

        return _context.abrupt("return");

      case 4:
        if (!backtesting) {
          debug('closing %d open positions [%s]', symbols.length, symbols.join(', '));
        }

        i = 0;

      case 6:
        if (!(i < symbols.length)) {
          _context.next = 19;
          break;
        }

        symbol = symbols[i];
        p = getPosition(state, symbol);
        lastPrice = getLastPrice(state, symbol);

        if (lastPrice) {
          _context.next = 12;
          break;
        }

        return _context.abrupt("continue", 16);

      case 12:
        mts = lastPrice.mts, price = lastPrice.price;

        if (!backtesting) {
          debug('closing position on %s (%f @ %f) with MARKET (%f) [%d]', symbol, p.amount, p.price, price, mts);
        }

        _context.next = 16;
        return regeneratorRuntime.awrap(closePositionMarket(state, {
          symbol,
          mts,
          price,
          label: 'close open positions'
        }));

      case 16:
        i += 1;
        _context.next = 6;
        break;

      case 19:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = closeOpenPositions;