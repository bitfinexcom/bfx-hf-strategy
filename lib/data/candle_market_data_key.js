'use strict'

/**
 * Generates key for candle market data on strategy state
 *
 * @param {bfx-api-node-models.Candle} candle - candle to generate key for
 * @returns {string} key
 */
const candleMarketDataKey = (candle = {}) => (
  `candles-${candle.symbol}-${candle.tf}`
)

module.exports = candleMarketDataKey
