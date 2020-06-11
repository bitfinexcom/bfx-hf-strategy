'use strict';

const _isObject = require('lodash/isObject');
/**
 * @throws {Error} throws if no position exists for the order or the order
 *   would close an existing position.
 *
 * @param {StrategyState} state - strategy state
 * @param {bfx-api-node-models.Order} order - order
 */


const throwsIfOrderClosesPosition = (state = {}, order = {}) => {
  const _state$positions = state.positions,
        positions = _state$positions === void 0 ? {} : _state$positions;
  const symbol = order.symbol;
  const position = positions[symbol];

  if (!_isObject(position)) {
    throw new Error(`no position exists for symbol ${symbol}`);
  }

  if (position.amount + order.amount === 0) {
    throw new Error('order would close existing position');
  }
};

module.exports = throwsIfOrderClosesPosition;