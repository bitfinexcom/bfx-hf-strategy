'use strict'

const _isEmpty = require('lodash/isEmpty')
const _isFunction = require('lodash/isFunction')
const initHelpersForStrategy = require('./init_helpers_for_strategy')

const HANDLERS = [
  'onPriceUpdate', 'onEnter', 'onUpdate', 'onUpdateLong', 'onUpdateShort',
  'onPositionOpen', 'onPositionUpdate', 'onPositionClose', 'onStart', 'onStop'
]

/**
 * Returns an initial strategy state object for the provided arguments. The
 * state object can then be used with the various HF strategy methods.
 *
 * @param {object} args - strategy arguments
 * @param {string} args.id - strategy ID
 * @param {string} args.name - strategy name (human readable)
 * @param {object[]} [args.plugins] - array of plugins
 * @param {boolean} [args.margin] - if true, trades on margin, otherwise exchange
 * @param {string} [args.symbol] - default symbol for data/trades
 * @param {string} [args.tf] - default candle time frame
 * @param {string} [args.candlePrice] - key to access on candle for price (defaults to close)
 * @param {object} [args.indicators] - managed indicators map
 * @param {Function} [args.onPriceUpdate] - called on every price update
 * @param {Function} [args.onEnter] - called when a position is opened
 * @param {Function} [args.onUpdate] - called on every price update if a
 *   position is open
 * @param {Function} [args.onUpdateLong] - called if a long position is open
 * @param {Function} [args.onUpdateShort] - called if a short position is open
 *   closed
 * @param {Function} [args.onPositionOpen] - called when a position is opened
 * @param {Function} [args.onPositionUpdate] - called when a position is updated
 * @param {Function} [args.onPositionClose] - called when a position is closed
 * @param {Function} [args.onStart] - called on strategy execution start
 * @param {Function} [args.onStop] - called on strategy execution end
 * @returns {StrategyState} state - initial strategy state
 */
const defineStrategy = (args = {}) => {
  if (!_isEmpty(args.plugins)) {
    args.plugins.filter(p => _isFunction(p.onInit)).forEach((plugin) => {
      args = plugin.onInit(args) // NOTE: not async
    })
  }

  const strategy = {
    ...args,

    candlePrice: args.candlePrice || 'close',
    marketData: {},
    positions: {}, // key'd by symbol
    trades: []
  }

  strategy.h = initHelpersForStrategy(strategy)

  // Bind handlers to the helper function so it can be accessed via this
  HANDLERS.forEach((hName) => {
    if (_isFunction(strategy[hName])) {
      strategy[hName] = strategy[hName].bind(strategy.h)
    }
  })

  return strategy
}

module.exports = defineStrategy
