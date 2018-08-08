'use strict'

const { forEachIndicator } = require('../indicators')

/**
 * Called for incoming seed-period trades.
 *
 * @param {Object} state
 * @param {Trade} trade
 * @return {Object} nextState
 */
module.exports = async (state = {}, trade = {}) => {
  forEachIndicator(state, i => i.update(trade.price))

  return {
    ...state,
    lastTrade: trade
  }
}
