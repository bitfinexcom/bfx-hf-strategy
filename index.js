'use strict'

/**
 * This module serves as a framework for creating trading bots/strategies on
 * the Bitfinex platform. It consists of a set of order methods and an
 * architecture compatible with {@link external:bfx-hf-data-server} and
 * {@link external:bfx-hf-backtest} for backtests on historical candle/trade
 * data, which can be transitioned seamlessly to trading on the live markets.
 *
 * Strategies written using this framework must define an `exec` function which
 * in turn is provided an instance of the
 * {@link module:bfx-hf-strategy/RuntimeHelpers|RuntimeHelpers} object bound to
 * that strategy during execution. The helpers can be used to control the
 * execution flow of the strategy, inspect data & indicators, and make
 * automated trading decisions.
 *
 * See {@link module:bfx-hf-strategy/RuntimeHelpers|RuntimeHelpers} for a full
 * list of methods available to the strategy `exec` function.
 *
 * @module bfx-hf-strategy
 * @license Apache-2.0
 * @example
 * const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
 * const HFS = require('bfx-hf-strategy')
 *
 * const SYMBOL = SYMBOLS.BTC_USD
 * const TF = TIME_FRAMES.ONE_HOUR
 *
 * const ExampleStrategy = ({ symbol, tf }) => HFS.define({
 *   id: 'example',
 *   name: 'example',
 *   takerFee: (0.002 * 1),
 *   makerFee: (0.001 * 1),
 *   keepOpenPositionsAtEnd: false,
 *   simulateLiveCandleEnabled: true,
 *   symbol,
 *   tf,
 *
 *   // This quickstart example immediately opens a long position, and then no
 *   // longer reacts to future market updates
 *   exec: async function () {
 *     if (!this.inAPosition()) {
 *       return this.openLongPositionMarket({
 *         mtsCreate: mts,
 *         amount: 1,
 *         price
 *       })
 *     }
 *   }
 * })
 *
 * let execState = ExampleStrategy({ SYMBOL, TF })
 *
 * for (let i = 0; i < candles.length; i += 1) {
 *   execState = await HFS.onCandle(execState, candles[i])
 * }
 *
 * execState = await HFS.closeOpenPositions(execState)
 *
 * HFS.logTrades(execState)
 */

/**
 * @external bfx-hf-backtest
 * @see https://github.com/bitfinexcom/bfx-hf-backtest
 */

/**
 * @external bfx-hf-data-server
 * @see https://github.com/bitfinexcom/bfx-hf-data-server
 */

/**
 * @external bfx-hf-strategy-exec
 * @see https://github.com/bitfinexcom/bfx-hf-strategy-exec
 */

const data = require('./lib/data')
const errors = require('./lib/errors')
const orders = require('./lib/orders')
const define = require('./lib/define')
const validate = require('./lib/validate')
const updates = require('./lib/updates')
const position = require('./lib/position')
const indicators = require('./lib/indicators')
const logTrades = require('./lib/debug/log_trades')

require('./lib/types/position_parameters')
require('./lib/types/strategy_state')
require('./lib/types/strategy_trade')

module.exports = {
  logTrades,
  validate,
  define,

  ...data,
  ...errors,
  ...indicators,
  ...orders,
  ...position,
  ...updates
}
