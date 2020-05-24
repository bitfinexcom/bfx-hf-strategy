'use strict'

const { forEachIndicator } = require('../indicators')

/**
 * Called for incoming seed-period trades.
 *
 * @memberof module:UpdateHandlers
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-api-node-models.PublicTrade} trade - seed trade
 */
const onSeedTrade = (state = {}, trade = {}) => {
  forEachIndicator(state, i => i.update(trade.price))
}

module.exports = onSeedTrade
