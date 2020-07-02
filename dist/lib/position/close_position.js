'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const _isObject = require('lodash/isObject');

const closePositionWithOrder = require('./close_position_with_order');

const getDefaultSymbol = require('../data/get_default_symbol');

const getPosition = require('../data/get_position');
/**
 * Closes an open position with an order. Throws an error if no position is
 * open for the order's symbol.
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */


const closePosition = (state = {}, orderParams = {}) => {
  var _orderParams$symbol, symbol, pos;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _orderParams$symbol = orderParams.symbol, symbol = _orderParams$symbol === void 0 ? getDefaultSymbol(state) : _orderParams$symbol;
        pos = getPosition(state, symbol);

        if (_isObject(pos)) {
          _context.next = 4;
          break;
        }

        throw new Error(`no position exists for ${symbol}`);

      case 4:
        return _context.abrupt("return", closePositionWithOrder(state, _objectSpread(_objectSpread({}, orderParams), {}, {
          amount: pos.amount * -1
        })));

      case 5:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = closePosition;