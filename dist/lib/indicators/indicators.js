'use strict';
/**
 * Strategy indicators selector
 *
 * @param {StrategyState} state - strategy state
 * @returns {object} indicators
 */

const indicators = (state = {}) => {
  const _state$indicators = state.indicators,
        indicators = _state$indicators === void 0 ? {} : _state$indicators;
  return indicators;
};

module.exports = indicators;