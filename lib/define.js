'use strict'

const debug = require('debug')('bfx:hf:strategy:define')
const _isEmpty = require('lodash/isEmpty')
const _isFunction = require('lodash/isFunction')
const initHelpersForStrategy = require('./helpers')

const DEFAULT_MAKER_FEE = 0.001
const DEFAULT_TAKER_FEE = 0.002

/**
 * Returns an initial strategy state object for the provided arguments. The
 * state object can then be used with the various HF strategy methods.
 *
 * @param {object} args - strategy arguments
 * @param {string} args.id - strategy ID
 * @param {string} args.name - strategy name (human readable)
 * @param {number} args.makerFee - maker fee as percent
 * @param {number} args.takerFee - taker fee as percent
 * @param {boolean} [args.simulateLiveCandleEnabled] - if true, generates random trades
 *   for each candle
 * @param {object[]} [args.plugins] - array of plugins
 * @param {boolean} [args.margin] - if true, trades on margin, otherwise exchange
 * @param {string} [args.symbol] - default symbol for data/trades
 * @param {string} [args.tf] - default candle time frame
 * @param {string} [args.candlePrice] - key to access on candle for price (defaults to close)
 * @param {object} [args.indicators] - managed indicators map
 * @param {Function} args.exec - strategy logic, called on every price update
 * @returns {StrategyState} state - initial strategy state
 */
const defineStrategy = (args = {}) => {
  if (!_isEmpty(args.plugins)) {
    args.plugins.filter(p => _isFunction(p.onInit)).forEach((plugin) => {
      args = plugin.onInit(args) // NOTE: not async
    })
  }

  if (!_isFunction(args.exec)) {
    throw new Error('Strategy exec() handler required')
  }

  const strategy = {
    candlePrice: 'close',
    ...args,
    marketData: {},
    positions: {}, // key'd by symbol
    trades: []
  }

  if (!strategy.makerFee) {
    debug('WARNING: defaulting to %f% maker fee', DEFAULT_MAKER_FEE * 100)
    strategy.makerFee = DEFAULT_MAKER_FEE
  } else {
    debug('running with %f% maker fee', strategy.makerFee * 100)
  }

  if (!strategy.takerFee) {
    debug('WARNING: defaulting to %f% taker fee', DEFAULT_TAKER_FEE * 100)
    strategy.takerFee = DEFAULT_TAKER_FEE
  } else {
    debug('running with %f% taker fee', strategy.takerFee * 100)
  }

  strategy.h = initHelpersForStrategy(strategy)

  // Bind handler to the helper function so it can be accessed via this
  strategy.exec = strategy.exec.bind(strategy.h)

  return strategy
}

module.exports = defineStrategy
