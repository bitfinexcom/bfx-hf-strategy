'use strict';

const tradeMarketDataKey = require('./trade_market_data_key');

const getDefaultSymbol = require('./get_default_symbol');
/**
 * Returns the trade dataset for the default symbol
 *
 * @param {StrategyState} state - strategy state
 * @returns {object[]} trades
 */


const getDefaultTrades = (state = {}) => {
  const _state$marketData = state.marketData,
        marketData = _state$marketData === void 0 ? {} : _state$marketData;
  const symbol = getDefaultSymbol(state);
  const dataKey = tradeMarketDataKey({
    symbol
  });
  return marketData[dataKey] || [];
};

module.exports = getDefaultTrades;