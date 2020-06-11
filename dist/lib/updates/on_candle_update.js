'use strict';

const _isEmpty = require('lodash/isEmpty');

const _isFinite = require('lodash/isFinite');

const _last = require('lodash/last');

const _require = require('../indicators'),
      indicatorValues = _require.indicatorValues,
      indicatorsReady = _require.indicatorsReady,
      updateIndicatorData = _require.updateIndicatorData;

const onPriceUpdate = require('./on_price_update');

const candleMarketDataKey = require('../data/candle_market_data_key');
/**
 * Called for an incoming candle update, for a candle previously passed to
 * onCandle() (same candle, new prices). Propagates the candle via onPriceUpdate
 *
 * @param {StrategyState} state - strategy state
 * @param {bfx-api-node-models.Candle} candle - candle
 * @returns {Promise} p
 */


const onCandleUpdate = (state = {}, candle = {}) => {
  var candlePrice, price, dataKey, candleMarketData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        candlePrice = state.candlePrice;
        price = candle[candlePrice];

        if (_isFinite(price)) {
          _context.next = 4;
          break;
        }

        throw new Error(`bad candle price key or value: (${candlePrice}: ${price})`);

      case 4:
        updateIndicatorData(state, 'candle', candle);
        candle.iv = indicatorValues(state);

        if (!indicatorsReady(state)) {
          _context.next = 9;
          break;
        }

        _context.next = 9;
        return regeneratorRuntime.awrap(onPriceUpdate(state, {
          price,
          candle,
          mts: candle.mts,
          symbol: candle.symbol,
          type: 'candle'
        }));

      case 9:
        dataKey = candleMarketDataKey(candle);
        candleMarketData = state.marketData[dataKey] || [];

        if (!_isEmpty(candleMarketData) && _last(candleMarketData).mts === candle.mts) {
          candleMarketData[candleMarketData.length - 1] = candle;
        }

        state.marketData[dataKey] = candleMarketData;

      case 13:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = onCandleUpdate;