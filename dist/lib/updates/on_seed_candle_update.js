'use strict';

const _require = require('../indicators'),
      updateIndicatorData = _require.updateIndicatorData;
/**
 * Called for an incoming seed-period candle update, for a candle previously
 * passed to onSeedCandle() (same candle, new prices)
 *
 * @param {StrategyState} state - strategy state
 * @param {bfx-api-node-models.Candle} candle - seed candle update
 */


const onSeedCandleUpdate = (state = {}, candle = {}) => {
  updateIndicatorData(state, 'candle', candle);
};

module.exports = onSeedCandleUpdate;