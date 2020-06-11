'use strict';

const _require = require('../indicators'),
      addIndicatorData = _require.addIndicatorData;

const addCandleData = require('../data/add_candle_data');
/**
 * Called for an incoming (new) seed-period candle
 *
 * @param {StrategyState} state - strategy state
 * @param {bfx-api-node-models.Candle} candle - seed candle
 * @returns {Promise} p
 */


const onSeedCandle = (state = {}, candle = {}) => {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        addIndicatorData(state, 'candle', candle);
        addCandleData(state, candle);

      case 2:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = onSeedCandle;