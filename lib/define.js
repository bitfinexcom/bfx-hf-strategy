'use strict'

/**
 * Returns an initial strategy state object for the provided arguments. The
 * state object can then be used with the various HF strategy methods.
 *
 * @param {Object} args
 * @param {string} args.id - strategy ID
 * @param {string} args.name - strategy name (human readable)
 * @param {boolean} args.margin - if true, trades on margin, otherwise exchange
 * @param {string} args.symbol - default symbol for data/trades
 * @param {string} args.tf - default candle time frame
 * @param {string?} args.candlePrice - key to access on candle for price (defaults to close)
 * @param {Object} args.indicators - managed indicators map
 * @param {Method} args.onPriceUpdate
 * @param {Method} args.onEnter
 * @param {Method} args.onUpdate
 * @param {Method} args.onUpdateLong
 * @param {Method} args.onUpdateShort
 * @param {Method} args.onUpdateClosing
 * @param {Method} args.onPositionOpen
 * @param {Method} args.onPositionUpdate
 * @param {Method} args.onPositionClose
 * @param {Method} args.onStart
 * @param {Method} args.onStop
 * @return {Object} state - initial strategy state
 */
module.exports = (args = {}) => ({
  ...args,

  candlePrice: args.candlePrice || 'close',
  marketData: {},
  positions: {}, // key'd by symbol
  trades: [],
})
