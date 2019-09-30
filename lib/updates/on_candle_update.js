'use strict'

const _isEmpty = require('lodash/isEmpty')
const _isFinite = require('lodash/isFinite')
const _last = require('lodash/last')

const { indicatorsReady, updateIndicatorData } = require('../indicators')
const onPriceUpdate = require('./on_price_update')
const candleMarketDataKey = require('../data/candle_market_data_key')

/**
 * Called for an incoming candle update, for a candle previously passed to
 * onCandle() (same candle, new prices). Propagates the candle via onPriceUpdate
 *
 * @param {Object} state
 * @param {Candle} candle
 * @return {Object} nextState
 */
module.exports = async (state = {}, candle = {}) => {
  const { candlePrice } = state
  const price = candle[candlePrice]

  if (!_isFinite(price)) {
    throw new Error(`bad candle price key or value: (${candlePrice}: ${price})`)
  }

  updateIndicatorData(state, 'candle', candle)
  
  let nextState = state

  if (indicatorsReady(state)) {
    nextState = await onPriceUpdate(state, {
      price,
      candle,
      mts: candle.mts,
      symbol: candle.symbol,
      type: 'candle'
    })
  }

  const dataKey = candleMarketDataKey(candle)
  const candleMarketData = [...(nextState.marketData[dataKey] || [])]

  if (!_isEmpty(candleMarketData) && _last(candleMarketData).mts === candle.mts) {
    candleMarketData[candleMarketData.length - 1] = candle
  }

  return {
    ...nextState,
    lastCandle: candle,

    marketData: {
      ...nextState.marketData,
      [dataKey]: candleMarketData
    }
  }
}
