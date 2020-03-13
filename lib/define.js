'use strict'

const _isFunction = require('lodash/isFunction')

// TODO: doc
const verifyPlugins = (plugins) => {
  // TODO: throw error if plugins conflict
}

/**
 * Returns an initial strategy state object for the provided arguments. The
 * state object can then be used with the various HF strategy methods.
 *
 * @param {object} args
 * @param {string} args.id - strategy ID
 * @param {string} args.name - strategy name (human readable)
 * @param {object[]} args.plugins - array of plugins
 * @param {boolean} args.margin - if true, trades on margin, otherwise exchange
 * @param {string} args.symbol - default symbol for data/trades
 * @param {string} args.tf - default candle time frame
 * @param {string?} args.candlePrice - key to access on candle for price (defaults to close)
 * @param {object} args.indicators - managed indicators map
 * @param {Function} args.onPriceUpdate
 * @param {Function} args.onEnter
 * @param {Function} args.onUpdate
 * @param {Function} args.onUpdateLong
 * @param {Function} args.onUpdateShort
 * @param {Function} args.onUpdateClosing
 * @param {Function} args.onPositionOpen
 * @param {Function} args.onPositionUpdate
 * @param {Function} args.onPositionClose
 * @param {Function} args.onStart
 * @param {Function} args.onStop
 * @return {object} state - initial strategy state
 */
const defineStrategy = (args = {}) => {
  if (args.plugins) {
    verifyPlugins(args.plugins)
  }

  args.plugins.filter(p => _isFunction(p.onInit)).forEach((plugin) => {
    args = plugin.onInit(args) // NOTE: not async
  })

  return {
    ...args,

    candlePrice: args.candlePrice || 'close',
    marketData: {},
    positions: {}, // key'd by symbol
    trades: []
  }
}

module.exports = defineStrategy
