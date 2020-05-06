'use strict'

const { addIndicatorData } = require('../indicators')
const addCandleData = require('../data/add_candle_data')

/**
 * Called for an incoming (new) seed-period candle
 *
 * @memberof module:UpdateHandlers
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {Candle} candle - seed candle
 * @returns {Promise} p
 */
const onSeedCandle = async (state = {}, candle = {}) => {
  addIndicatorData(state, 'candle', candle)
  addCandleData(state, candle)
}

module.exports = onSeedCandle
