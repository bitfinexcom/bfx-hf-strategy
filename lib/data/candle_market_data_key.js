'use strict'

/**
 * Generates key for candle market data on strategy state
 *
 * @memberof module:Data
 * @private
 *
 * @param {Candle} candle - candle to generate key for
 * @returns {string} key
 */
const candleMarketDataKey = (candle = {}) => (
  `candles-${candle.symbol}-${candle.tf}`
)

module.exports = candleMarketDataKey
