'use strict'

const { addIndicatorData } = require('../indicators')
const addCandleData = require('../data/add_candle_data')

/**
 * Called for an incoming (new) seed-period candle
 *
 * @memberof module:UpdateHandlers
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-api-node-models.Candle} candle - seed candle
 * @returns {Promise} p
 */
const onSeedCandle = async (state = {}, candle = {}) => {
  addIndicatorData(state, 'candle', candle)
  addCandleData(state, candle)
}

module.exports = onSeedCandle
