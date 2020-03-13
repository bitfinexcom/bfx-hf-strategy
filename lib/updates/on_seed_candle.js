'use strict'

const { addIndicatorData, indicatorValues } = require('../indicators')
const addCandleData = require('../data/add_candle_data')

/**
 * Called for an incoming (new) seed-period candle
 *
 * @memberOf module:UpdateHandlers
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {Candle} candle - seed candle
 * @returns {Promise} p - resolves to nextState
 */
const onSeedCandle = async (state = {}, candle = {}) => {
  addIndicatorData(state, 'candle', candle)
  candle.iv = indicatorValues(state)
  addCandleData(state, candle)

  return {
    ...state,
    lastCandle: candle
  }
}

module.exports = onSeedCandle
