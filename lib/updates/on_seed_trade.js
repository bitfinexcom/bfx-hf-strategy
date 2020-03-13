'use strict'

const { forEachIndicator } = require('../indicators')

/**
 * Called for incoming seed-period trades.
 *
 * @param {object} state
 * @param {Trade} trade
 * @return {Promise} p - resolves to nextState
 */
const onSeedTrade = async (state = {}, trade = {}) => {
  forEachIndicator(state, i => i.update(trade.price))

  return {
    ...state,
    lastTrade: trade
  }
}

module.exports = onSeedTrade
