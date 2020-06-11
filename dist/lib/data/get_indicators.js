'use strict';
/**
 * Returns the indicator map for the strategy
 *
 * @param {StrategyState} state - strategy state
 * @returns {object} indicators
 */

const getIndicators = (state = {}) => {
  const _state$indicators = state.indicators,
        indicators = _state$indicators === void 0 ? {} : _state$indicators;
  return indicators;
};

module.exports = getIndicators;