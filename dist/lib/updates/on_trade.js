'use strict';

const _require = require('../indicators'),
      indicatorsReady = _require.indicatorsReady,
      updateIndicatorData = _require.updateIndicatorData;

const onPriceUpdate = require('./on_price_update');

const addTradeData = require('../data/add_trade_data');
/**
 * Called for an incoming (new) trade. Propagates the trade via onPriceUpdate
 *
 * @param {StrategyState} state - strategy state
 * @param {bfx-api-node-models.PublicTrade} trade - trade
 * @returns {Promise} p
 */


const onTrade = (state = {}, trade = {}) => {
  var mts, price, symbol;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        mts = trade.mts, price = trade.price, symbol = trade.symbol;
        updateIndicatorData(state, 'trade', price);
        addTradeData(state, trade);

        if (!indicatorsReady(state)) {
          _context.next = 6;
          break;
        }

        _context.next = 6;
        return regeneratorRuntime.awrap(onPriceUpdate(state, {
          mts,
          price,
          trade,
          symbol,
          type: 'trade'
        }));

      case 6:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = onTrade;