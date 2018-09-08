'use strict'

const _isEmpty = require('lodash/isEmpty')
const _isFinite = require('lodash/isFinite')

const {
  indicatorValues, indicatorsReady, updateIndicatorData
} = require('../indicators')
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

  if (indicatorsReady(state)) {
    await onPriceUpdate(state, {
      price,
      candle,
      mts: candle.mts,
      symbol: candle.symbol,
      type: 'candle'
    })
  }

  const dataKey = candleMarketDataKey(candle)
  const candleMarketData = [...(state.marketData[dataKey] || [])]

  if (!_isEmpty(candleMarketData) && _last(candleMarketData).mts === candle.mts) {
    candleMarketData[candleMarketData.length - 1] = candle

    // TODO: Extract as updateIndicatorData()
    const iv = indicatorValues(state)
    const ikey = `indicators-${candle.symbol}-${candle.tf}`

    if (!state.indicatorData[ikey]) {
      state.indicatorData[ikey] = [iv]
    } else {
      const indicatorData = state.indicatorData[ikey]
      indicatorData[indicatorData.length - 1] = iv
    }
  }

  return {
    ...state,
    lastCandle: candle,

    marketData: {
      ...state.marketData,
      [dataKey]: candleMarketData
    }
  }
}
