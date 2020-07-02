'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const _isFinite = require('lodash/isFinite');

const _require = require('bfx-api-node-models'),
      Order = _require.Order;

const _require2 = require('../errors'),
      safeThrow = _require2.safeThrow;

const openPosition = require('./open_position');

const _require3 = require('../data'),
      getLastPrice = _require3.getLastPrice,
      getDefaultSymbol = _require3.getDefaultSymbol;
/**
 * Opens a new position with a market order. Pulls order timestamp and price
 * from last received data for the order's symbol.
 *
 * @throws {Error} If no timestamp or price data available and none supplied
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */


const openPositionMarket = (state = {}, orderParams = {}) => {
  var margin, orderPrice, orderMTS, _orderParams$symbol, symbol, lastPriceData, price, mts;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        margin = state.margin;
        orderPrice = orderParams.price, orderMTS = orderParams.mtsCreate, _orderParams$symbol = orderParams.symbol, symbol = _orderParams$symbol === void 0 ? getDefaultSymbol(state) : _orderParams$symbol;
        lastPriceData = getLastPrice(state, symbol);
        price = orderPrice || (lastPriceData || {}).price;
        mts = orderMTS || (lastPriceData || {}).mts;

        if (!_isFinite(price)) {
          safeThrow(state, 'no price data available and no price supplied on order parameters');
        } else if (!_isFinite(mts)) {
          safeThrow(state, 'no last timestamp available and none supplied on order parameters');
        }

        return _context.abrupt("return", openPosition(state, _objectSpread(_objectSpread({}, orderParams), {}, {
          price,
          mtsCreate: mts,
          type: margin ? Order.type.MARKET : Order.type.EXCHANGE_MARKET
        })));

      case 7:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = openPositionMarket;