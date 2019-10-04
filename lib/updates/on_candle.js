'use strict'

const _isFinite = require('lodash/isFinite')

const onPriceUpdate = require('./on_price_update')
const addCandleData = require('../data/add_candle_data')
const { indicatorsReady, addIndicatorData } = require('../indicators')

/**
 * Called for an incoming (new) candle. Propagates the candle via onPriceUpdate
 *
 * @param {Object} state
 * @param {Candle} candle
 * @return {Promise} p - resolves to nextState
 */
const onCandle = async (state = {}, candle = {}) => {
  const { candlePrice } = state
  const { mts } = candle
  const price = candle[candlePrice]

  if (!_isFinite(price)) {
    throw new Error(`bad candle price key or value: (${candlePrice}: ${price})`)
  }

  addIndicatorData(state, 'candle', candle)
  // candle.iv = indicatorValues(state)
  addCandleData(state, candle)

  let nextState = state

  if (indicatorsReady(state)) {
    nextState = await onPriceUpdate(nextState, {
      mts,
      price,
      candle,
      symbol: candle.symbol,
      type: 'candle'
    })
  }

  return {
    ...nextState,
    lastCandle: candle
  }
}

module.exports = onCandle
