'use strict';
/**
 * Returns an array of trades executed by the strategy
 *
 * @param {StrategyState} state - strategy state
 * @returns {StrategyTrade[]} trades - sorted oldest first
 */

const getStrategyTrades = (state = {}) => {
  const _state$trades = state.trades,
        trades = _state$trades === void 0 ? [] : _state$trades;
  return trades;
};

module.exports = getStrategyTrades;