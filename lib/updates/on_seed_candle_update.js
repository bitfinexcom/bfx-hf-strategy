'use strict'

const { updateIndicatorData } = require('../indicators')

/**
 * Called for an incoming seed-period candle update, for a candle previously
 * passed to onSeedCandle() (same candle, new prices)
 *
 * @memberOf module:UpdateHandlers
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {Candle} candle - seed candle update
 * @returns {Promise} p - resolves to nextState
 */
const onSeedCandleUpdate = async (state = {}, candle = {}) => {
  updateIndicatorData(state, 'candle', candle)

  return { ...state }
}

module.exports = onSeedCandleUpdate
