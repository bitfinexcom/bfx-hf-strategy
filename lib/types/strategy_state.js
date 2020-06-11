'use strict'

/**
 * Strategy state updated throughout the lifetime of a strategy, used for both
 * backtesting and live execution. The core of this library.
 *
 * @typedef StrategyState
 * @property {string} id - strategy ID
 * @property {string} name - strategy name (human readable)
 * @property {number} makerFee - maker fee
 * @property {number} takerFee - taker fee
 * @property {object} marketData - internal map of market data, trades and
 *  candles
 * @property {object} positions - internal map of positions key'ed by symbol
 * @property {object[]} trades - array of trades performed by the strategy
 * @property {Function} exec - strategy execution logic
 * @property {object[]} [plugins] - array of plugins
 * @property {boolean} [margin] - if true, trades on margin, otherwise exchange
 * @property {string} [symbol] - default symbol for data/trades
 * @property {string} [tf] - default candle time frame
 * @property {object} [indicators] - managed indicators map
 * @property {module:bfx-hf-strategy/RuntimeHelpers} [helpers] - helpers
 *   module, bound to this strategy instance
 * @property {string} [candlePrice] - key on candle from which to pull price,
 *   used for updating indicators. Defaults to 'close'
 */
