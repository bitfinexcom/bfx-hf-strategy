'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const _require = require('bfx-api-node-models'),
      Order = _require.Order;

require('../types/order_parameters');
/**
 * Simulates a fill for backtests, replaces submitOrder()
 *
 * @throws {Error} Fails if the fill amount is larger than the order size
 *
 * @param {OrderParameters} orderParams - order parameters
 * @param {number} [fillAmount] - defaults to entire order
 * @returns {bfx-api-node-models.Order} filledOrder
 */


const simulateOrderFill = (orderParams = {}, fillAmount) => {
  const amountToFill = fillAmount || orderParams.amount;
  const amountOrig = orderParams.amountOrig,
        amount = orderParams.amount,
        price = orderParams.price,
        _orderParams$mtsCreat = orderParams.mtsCreate,
        mtsCreate = _orderParams$mtsCreat === void 0 ? Date.now() : _orderParams$mtsCreat;

  if (amountToFill > amount) {
    throw new Error('requested fill greater than order size (%d > %d)', amountToFill, amount);
  }

  return new Order(_objectSpread(_objectSpread({}, orderParams), {}, {
    amount: amount - amountToFill,
    amountOrig: amountOrig || amount,
    priceAvg: price,
    mtsCreate
  }));
};

module.exports = simulateOrderFill;