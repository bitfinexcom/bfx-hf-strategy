'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const _require = require('bfx-api-node-models'),
      Order = _require.Order;

const closePosition = require('./close_position');

const _require2 = require('../data'),
      getLastPrice = _require2.getLastPrice,
      getDefaultSymbol = _require2.getDefaultSymbol;
/**
 * Closes a position with a limit order
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @returns {Promise} p
 */


const closePositionLimit = (state = {}, orderParams = {}) => {
  var margin, orderMTS, _orderParams$symbol, symbol, lastPriceData, mts;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        margin = state.margin;
        orderMTS = orderParams.mtsCreate, _orderParams$symbol = orderParams.symbol, symbol = _orderParams$symbol === void 0 ? getDefaultSymbol(state) : _orderParams$symbol;
        lastPriceData = getLastPrice(state, symbol);
        mts = orderMTS || (lastPriceData || {}).mts;
        return _context.abrupt("return", closePosition(state, _objectSpread(_objectSpread({}, orderParams), {}, {
          mtsCreate: mts,
          type: margin ? Order.type.LIMIT : Order.type.EXCHANGE_LIMIT
        })));

      case 5:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = closePositionLimit;