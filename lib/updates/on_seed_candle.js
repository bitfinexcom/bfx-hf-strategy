'use strict'

const { addIndicatorData } = require('../indicators')

/**
 * Called for an incoming (new) seed-period candle
 *
 * @param {Object} state
 * @param {Candle} candle
 * @return {Object} nextState
 */
module.exports = async (state = {}, candle = {}) => {
  addIndicatorData(state, 'candle', candle)

  return {
    ...state,
    lastCandle: candle
  }
}
