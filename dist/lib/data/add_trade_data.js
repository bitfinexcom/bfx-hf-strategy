'use strict';

const tradeMarketDataKey = require('./trade_market_data_key');
/**
 * Updates the trade dataset in-place with a new trade.
 *
 * @param {StrategyState} state - strategy state
 * @param {bfx-api-node-models.PublicTrade} trade - incoming trade
 * @returns {StrategyState} state - same state reference
 */


const addTradeData = (state = {}, trade = {}) => {
  const dataKey = tradeMarketDataKey(trade);

  if (!state.marketData[dataKey]) {
    state.marketData[dataKey] = [];
  }

  state.marketData[dataKey].push(trade);
  return state;
};

module.exports = addTradeData;