'use strict';
/**
 * Calls the provided function with each indicator on the strategy.
 *
 * @param {StrategyState} state - strategy state
 * @param {Function} f - function to call
 */

const forEachIndicator = (state = {}, f = () => {}) => {
  const _state$indicators = state.indicators,
        indicators = _state$indicators === void 0 ? {} : _state$indicators;

  for (const key in indicators) {
    f(indicators[key], key);
  }
};

module.exports = forEachIndicator;