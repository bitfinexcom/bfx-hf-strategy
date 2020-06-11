'use strict';

const _require = require('../indicators'),
      forEachIndicator = _require.forEachIndicator;
/**
 * Called for incoming seed-period trades.
 *
 * @param {StrategyState} state - strategy state
 * @param {bfx-api-node-models.PublicTrade} trade - seed trade
 */


const onSeedTrade = (state = {}, trade = {}) => {
  forEachIndicator(state, i => i.update(trade.price));
};

module.exports = onSeedTrade;