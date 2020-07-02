'use strict';

const _isFinite = require('lodash/isFinite');

const _require = require('bfx-api-node-models'),
      Order = _require.Order;

const _require2 = require('bfx-hf-util'),
      SYMBOLS = _require2.SYMBOLS;

const getDefaultSymbol = require('../data/get_default_symbol');

const SYMBOL_LIST = Object.values(SYMBOLS);
/**
 * Ensures the provided parameters contain an amount, valid type, and valid
 * symbol
 *
 * @throws {Error} throws if given an invalid amount, order type or symbol
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 */

const validateOrderParams = (state = {}, orderParams = {}) => {
  const _orderParams$symbol = orderParams.symbol,
        symbol = _orderParams$symbol === void 0 ? getDefaultSymbol(state) : _orderParams$symbol,
        type = orderParams.type,
        amount = orderParams.amount;

  if (!_isFinite(amount)) {
    throw new Error(`invalid amount provided: ${amount}`);
  } else if (!Order.type[type]) {
    throw new Error(`unrecognized order type: ${type}`);
  } else if (SYMBOL_LIST[symbol] === -1) {
    throw new Error(`unrecognized symbol: ${symbol}`);
  }
};

module.exports = validateOrderParams;