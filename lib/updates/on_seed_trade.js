'use strict'

const { forEachIndicator } = require('../indicators')

/**
 * Called for incoming seed-period trades.
 *
 * @memberof module:UpdateHandlers
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {Trade} trade - seed trade
 */
const onSeedTrade = (state = {}, trade = {}) => {
  forEachIndicator(state, i => i.update(trade.price))
}

module.exports = onSeedTrade
