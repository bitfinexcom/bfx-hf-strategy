'use strict';

const _isFinite = require('lodash/isFinite');

const onPriceUpdate = require('./on_price_update');

const addCandleData = require('../data/add_candle_data');

const _require = require('../indicators'),
      indicatorValues = _require.indicatorValues,
      indicatorsReady = _require.indicatorsReady,
      addIndicatorData = _require.addIndicatorData;
/**
 * Called for an incoming (new) candle. Propagates the candle via onPriceUpdate
 *
 * @throws {Error} Fails if no price is included on the candle, based on the
 *   configured candle key
 *
 * @param {StrategyState} state - strategy state
 * @param {bfx-api-node-models.Candle} candle - candle
 * @returns {Promise} p
 */


const onCandle = (state = {}, candle = {}) => {
  var candlePrice, mts, price;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        candlePrice = state.candlePrice;
        mts = candle.mts;
        price = candle[candlePrice];

        if (_isFinite(price)) {
          _context.next = 5;
          break;
        }

        throw new Error(`bad candle price key or value: (${candlePrice}: ${price})`);

      case 5:
        addIndicatorData(state, 'candle', candle);
        candle.iv = indicatorValues(state);
        addCandleData(state, candle);

        if (!indicatorsReady(state)) {
          _context.next = 11;
          break;
        }

        _context.next = 11;
        return regeneratorRuntime.awrap(onPriceUpdate(state, {
          mts,
          price,
          candle,
          symbol: candle.symbol,
          type: 'candle'
        }));

      case 11:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = onCandle;