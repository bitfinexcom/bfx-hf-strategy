'use strict'

const { addIndicatorData } = require('../indicators')
const addCandleData = require('../data/add_candle_data')

/**
 * Called for an incoming (new) seed-period candle
 *
 * @param {StrategyState} state - strategy state
 * @param {bfx-api-node-models.Candle} candle - seed candle
 * @returns {Promise} p
 */
const onSeedCandle = async (state = {}, candle = {}) => {
  addIndicatorData(state, 'candle', candle)
  addCandleData(state, candle)
}

module.exports = onSeedCandle
