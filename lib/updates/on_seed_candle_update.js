'use strict'

const { updateIndicatorData } = require('../indicators')

/**
 * Called for an incoming seed-period candle update, for a candle previously
 * passed to onSeedCandle() (same candle, new prices)
 *
 * @param {object} state
 * @param {Candle} candle
 * @return {Promise} p - resolves to nextState
 */
const onSeedCandleUpdate = async (state = {}, candle = {}) => {
  updateIndicatorData(state, 'candle', candle)

  return {
    ...state,
    lastCandle: candle
  }
}

module.exports = onSeedCandleUpdate
