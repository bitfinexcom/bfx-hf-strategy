'use strict'

/**
 * Generates key for trade market data on strategy state
 *
 * @memberof module:bfx-hf-strategy
 * @private
 *
 * @param {module:bfx-api-node-models.PublicTrade} trade - trade to generate
 *   key for
 * @returns {string} key
 */
const tradeMarketDataKey = (trade = {}) => (
  `trades-${trade.symbol}`
)

module.exports = tradeMarketDataKey
