'use strict';

const _includes = require('lodash/includes');

const _require = require('bfx-hf-util'),
      SYMBOLS = _require.SYMBOLS;

const getDefaultSymbol = require('../data/get_default_symbol');

const SYMBOL_LIST = Object.values(SYMBOLS);
/**
 * Creates a new/fresh position object, as used by the internal strategy state
 *
 * @param {StrategyState} state - strategy state
 * @param {PositionParameters} args - parameters
 * @returns {StrategyPosition} position - position
 * @throws {Error} fails if given an unknown symbol
 */

const createPositionObject = (state = {}, args = {}) => {
  const price = args.price,
        amount = args.amount,
        _args$trades = args.trades,
        trades = _args$trades === void 0 ? [] : _args$trades,
        _args$tag = args.tag,
        tag = _args$tag === void 0 ? '' : _args$tag;
  const symbol = args.symbol || getDefaultSymbol(state);

  if (!_includes(SYMBOL_LIST, symbol)) {
    throw new Error('unknown symbol: %s', symbol);
  }

  return {
    symbol,
    price,
    amount,
    trades,
    tag
  };
};

module.exports = createPositionObject;