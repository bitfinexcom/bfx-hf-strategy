'use strict';
/**
 * A set of parameters defining a trading strategy. Can be passed to
 * {@link defineStrategy} to obtain a {@link StrategyState} object which can
 * then be used with either {@link external:bfx-hf-backtest} for backtesting on
 * historical data, or {@link external:bfx-hf-strategy-exec} for live
 * execution.
 *
 * @typedef {object} StrategyDefinition
 * @property {string} id - strategy ID
 * @property {string} name - strategy name (human readable)
 * @property {number} makerFee - maker fee as percent
 * @property {number} takerFee - taker fee as percent
 * @property {boolean} [simulateLiveCandleEnabled=false] - if true, generates
 *   random trades for each candle
 * @property {object[]} [plugins] - array of plugins
 * @property {boolean} [margin] - if true, trades on margin, otherwise exchange
 * @property {string} [symbol] - default symbol for data/trades
 * @property {string} [tf] - default candle time frame
 * @property {string} [candlePrice='close'] - key to access on candle for price
 * @property {object} [indicators] - managed indicators map
 * @property {Function} exec - strategy logic, called on every price update
 */