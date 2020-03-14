'use strict'

const { forEachIndicator } = require('../indicators')

/**
 * Called for incoming seed-period trades.
 *
 * @memberOf module:UpdateHandlers
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {Trade} trade - seed trade
 * @returns {Promise} p - resolves to nextState
 */
const onSeedTrade = async (state = {}, trade = {}) => {
  forEachIndicator(state, i => i.update(trade.price))

  return { ...state }
}

module.exports = onSeedTrade
