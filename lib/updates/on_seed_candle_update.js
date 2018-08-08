'use strict'

const { updateIndicatorData } = require('../indicators')

/**
 * Called for an incoming seed-period candle update, for a candle previously
 * passed to onSeedCandle() (same candle, new prices)
 *
 * @param {Object} state
 * @param {Candle} candle
 * @return {Object} nextState
 */
module.exports = async (state = {}, candle = {}) => {
  updateIndicatorData(state, 'candle', candle)

  return {
    ...state,
    lastCandle: candle
  }
}
