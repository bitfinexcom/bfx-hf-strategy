'use strict'

/**
 * This module serves as a framework for creating trading bots/strategies on
 * the Bitfinex platform. It consists of a set of order methods and an
 * architecture compatible with
 * {@link module:bfx-hf-data-server|bfx-hf-data-server} and
 * {@link module:bfx-hf-backtest|bfx-hf-backtest} for backtests on historical
 * candle/trade data, which can be transitioned seamlessly to trading on the
 * live markets.
 *
 * Strategies written using this framework must define an `exec` function which
 * in turn is provided an instance of the
 * {@link module:bfx-hf-strategy.Helpers|Helpers} object bound to that strategy
 * during execution. The helpers can be used to control the execution flow of
 * the strategy, inspect data & indicators, and make automated trading
 * decisions.
 *
 * See {@link module:bfx-hf-strategy.Helpers|Helpers} for a full list of
 * strategy runtime methods.
 *
 * ### Features
 * * Event-driven design approach allowing strategies to react to market
 *   updates in real-time
 * * Compatibility with {@link module:bfx-hf-backtest|bfx-hf-backtest} for
 *   backtest execution
 * * Compatibility with
 *   {@link module:bfx-hf-strategy-exec|bfx-hf-strategy-exec} for execution on
 *   live markets
 *
 * ### Installation
 *
 * ```bash
 * npm i --save bfx-hf-strategy
 * ```
 *
 * ### Quickstart & Example
 *
 * Using {@link module:bfx-hf-strategy|bfx-hf-strategy} implies writing a
 * custom strategy utilizing the methods provided by the library. The following
 * is an example of a valid strategy as defined within `examples/macd_cross`:
 *
 * ```js
 * const { MACD } = require('bfx-hf-indicators')
 * const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
 * const HFS = require('bfx-hf-strategy')
 *
 * module.exports = ({
 *   symbol = SYMBOLS.BTC_USD,
 *   tf = TIME_FRAMES.ONE_HOUR
 * } = {}) => HFS.define({
 *   id: 'quickstart_example',
 *   name: 'quickstart_example',
 *   symbol,
 *   tf,
 *
 *   indicators: {
 *     macd: new MACD([10, 26, 9])
 *   },
 *
 *   // This quickstart example immediately opens a long position, and then no
 *   // longer reacts to future market updates
 *   onPriceUpdate: async (state = {}, update = {}) => {
 *     const position = HFS.getPosition(state)
 *
 *     if (position) {
 *       return state
 *     }
 *
 *     return HFS.openLongPositionMarket(state, {
 *       mtsCreate: mts,
 *       amount: 1,
 *       price
 *     })
 *   }
 * })
 * ```
 *
 * @module bfx-hf-strategy
 */

const data = require('./lib/data')
const errors = require('./lib/errors')
const indicators = require('./lib/indicators')
const orders = require('./lib/orders')
const position = require('./lib/position')
const updates = require('./lib/updates')
const define = require('./lib/define')

require('./lib/types/position_parameters')
require('./lib/types/strategy_state')
require('./lib/types/strategy_trade')
require('./lib/types/candle')
require('./lib/types/trade')
require('./lib/types/order')

module.exports = {
  define,

  ...data,
  ...errors,
  ...indicators,
  ...orders,
  ...position,
  ...updates
}
