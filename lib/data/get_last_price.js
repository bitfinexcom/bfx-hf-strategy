'use strict'

const _last = require('lodash/last')
const getCandles = require('./get_candles')
const getTrades = require('./get_trades')
const getDefaultSymbol = require('./get_default_symbol')
const getDefaultTF = require('./get_default_tf')

/**
 * Get the last price & timestamp received for the specified symbol & tf.
 *
 * @param {Object} state
 * @param {string?} symbol - optional, defaults to strategy symbol
 * @param {string?} tf - optional, defaults to strategy tf
 * @return {Object} pp - price point, { mts, price } (null if unavailable)
 */
const getLastPrice = (state = {}, _symbol, _tf) => {
  const { candlePrice } = state
  const tf = _tf || getDefaultTF(state)
  const symbol = _symbol || getDefaultSymbol(state)
  const candles = getCandles(state, symbol, tf)
  const trades = getTrades(state, symbol)
  const lastCandle = _last(candles)
  const lastTrade = _last(trades)

  if (!lastCandle && !lastTrade) {
    return null
  } else if (lastTrade && lastTrade.mts > lastCandle.mts) {
    return {
      price: lastTrade.price,
      mts: lastTrade.mts
    }
  } else {
    return {
      price: lastCandle[candlePrice],
      mts: lastCandle.mts
    }
  }
}

module.exports = getLastPrice
