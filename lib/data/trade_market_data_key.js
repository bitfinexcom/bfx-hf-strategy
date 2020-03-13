'use strict'

/**
 * Generates key for trade market data on strategy state
 *
 * @memberOf module:Data
 * @private
 *
 * @param {Trade} trade - trade to generate key for
 * @returns {string} key
 */
const tradeMarketDataKey = (trade = {}) => (
  `trades-${trade.symbol}`
)

module.exports = tradeMarketDataKey
