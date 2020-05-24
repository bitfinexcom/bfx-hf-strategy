'use strict'

/**
 * Strategy state updated throughout the lifetime of a strategy, used for both
 * backtesting and live execution. The core of this library.
 *
 * @typedef module:bfx-hf-strategy.StrategyState
 * @property {string} id - strategy ID
 * @property {string} name - strategy name (human readable)
 * @property {string} [candlePrice] - key on candle from which to pull price,
 *   used for updating indicators. Defaults to 'close'
 * @property {object} marketData - internal map of market data, trades and
 *  candles
 * @property {object} positions - internal map of positions key'ed by symbol
 * @property {object[]} trades - array of trades performed by the strategy
 * @property {object[]} [plugins] - array of plugins
 * @property {boolean} [margin] - if true, trades on margin, otherwise exchange
 * @property {string} [symbol] - default symbol for data/trades
 * @property {string} [tf] - default candle time frame
 * @property {object} [indicators] - managed indicators map
 * @property {Function} [onPriceUpdate] - called on every price update
 * @property {Function} [onEnter] - called when a position is opened
 * @property {Function} [onUpdate] - called on every price update if a
 *   position is open
 * @property {Function} [onUpdateLong] - called if a long position is open
 * @property {Function} [onUpdateShort] - called if a short position is open
 *   closed
 * @property {Function} [onPositionOpen] - called when a position is opened
 * @property {Function} [onPositionUpdate] - called when a position is updated
 * @property {Function} [onPositionClose] - called when a position is closed
 * @property {Function} [onStart] - called on strategy execution start
 * @property {Function} [onStop] - called on strategy execution end
 */
