'use strict'

const debug = require('debug')
const { TIME_FRAME_WIDTHS } = require('bfx-hf-util')
const _isString = require('lodash/isString')
const _isObject = require('lodash/isObject')
const _isFinite = require('lodash/isFinite')
const _includes = require('lodash/includes')
const _some = require('lodash/some')
const _last = require('lodash/last')

const { breakExec, evaluateCondition } = require('../util')
const { safeThrow, ErrorInterruptExec } = require('../errors')
const { indicatorValues } = require('../indicators')
const {
  closeOpenPositions, closePosition, closePositionLimit, closePositionMarket,
  closePositionWithOrder, openLongPosition, openLongPositionLimit,
  openLongPositionMarket, openPosition, openPositionLimit, openPositionMarket,
  openPositionWithOrder, openShortPosition, openShortPositionLimit,
  openShortPositionMarket, updateLongPosition, updateLongPositionLimit,
  updateLongPositionMarket, updatePosition, updatePositionLimit,
  updatePositionMarket, updatePositionWithOrder, updateShortPosition,
  updateShortPositionLimit, updateShortPositionMarket, withNoPosition,
  withPosition
} = require('../position')

const {
  getDefaultSymbol, getPosition, getIndicator, getLastPrice, getStrategyTrades,
  getIndicators, getCandles, getFees, getDefaultTF
} = require('../data')

/**
 * A set of utility functions bound to the strategy they are used in, providing
 * control over strategy execution, access to data, and order manipulation
 * methods.
 *
 * @module bfx-hf-strategy/RuntimeHelpers
 */

/**
 * Returns an initialized {@link module:RuntimeHelpers} instance bound to the
 * provided {@link StrategyState}.
 *
 * @private
 * @memberof module:bfx-hf-strategy
 *
 * @param {StrategyState} strategy - strategy state
 * @returns {module:RuntimeHelpers} helpers
 */
const initHelpersForStrategy = (strategy = {}) => {
  const h = {}
  const _d = debug('live >')
  const liveDebug = (...args) => {
    if (!strategy.backtesting) {
      _d(...args)
    }
  }
  // We can safely log start here as helpers are initialized prior to execution
  liveDebug('starting up at %s', new Date().toLocaleString())

  /**
   * Indicates if the strategy is under backtest
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name isBacktesting
   *
   * @returns {boolean} isBacktesting
   */
  h.isBacktesting = () => !!strategy.backtesting

  /**
   * Helper to log via `debug` only during live execution (no-op under
   * backtest)
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name liveLog
   *
   * @param {...(string|number|object|Array)} args - passed to `debug`
   */
  h.liveLog = (...args) => {
    liveDebug(...args)
  }

  /**
   * Get strategy fees
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name fees
   *
   * @returns {object} fees - { maker, taker }
   */
  h.fees = () => getFees(strategy)

  /**
   * Get the number of seen candles
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name nCandles
   *
   * @param {string} [symbol] - defaults to strategy `symbol`
   * @param {string} [tf] - defaults to strategy `tf`
   * @returns {number} nCandles
   */
  h.nCandles = (symbol, tf) => (
    getCandles(strategy, symbol, tf).length
  )

  /**
   * Get all seen candles
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name candles
   *
   * @param {string} [symbol] - defaults to strategy `symbol`
   * @param {string} [tf] - defaults to strategy `tf`
   * @returns {bfx-api-node-models.Candle[]} candles
   */
  h.candles = (symbol, tf) => (
    getCandles(strategy, symbol, tf)
  )

  /**
   * Get the most recent seen candle
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name currentCandle
   *
   * @param {string} [symbol] - defaults to strategy `symbol`
   * @param {string} [tf] - defaults to strategy `tf`
   * @returns {bfx-api-node-models.Candle} candle
   */
  h.currentCandle = (symbol, tf) => (
    _last(getCandles(strategy, symbol, tf))
  )

  /**
   * Get the previous `n` candles
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name prevCandles
   *
   * @param {number} [n=1] - number of candles to return
   * @param {number} [offset=0] - offset from most recent candle
   * @param {string} [symbol] - defaults to strategy `symbol`
   * @param {string} [tf] - defaults to strategy `tf`
   * @returns {bfx-api-node-models.Candle[]} candles
   */
  h.prevCandles = (n = 1, offset = 0, symbol, tf) => {
    const candles = getCandles(strategy, symbol, tf)

    return candles.slice(
      candles.length - 1 - n - offset, candles.length - 1 - offset
    )
  }

  /**
   * Checks if the specified indicator did not recently meet the specified
   * condition; as some indicators store multiple numeric values per data point
   * (MACD, etc), a variable-type condition is supported and passed to `_some`.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name indicatorWasNotRecently
   *
   * @param {string} id - indicator ID
   * @param {object|number|Array} condition - passed to `_some` against all
   *   indicator values in the lookback period
   * @param {number} [lookback=30] - number of previous indicator values to
   *   check the condition against
   * @returns {boolean} wasNot
   */
  h.indicatorWasNotRecently = (id, condition, lookback = 30) => {
    const values = h.prevCandles(lookback).map(c => c.iv[id])
    return !_some(values, condition)
  }

  /**
   * Returns the strategy's trades
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name trades
   *
   * @returns {StrategyTrade[]} trades
   */
  h.trades = () => getStrategyTrades(strategy)

  /**
   * Closes all open positions with market orders
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name closeOpenPositions
   *
   * @returns {Promise} p
   */
  h.closeOpenPositions = () => closeOpenPositions(strategy)

  /**
   * Closes an open position with an order.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name closePosition
   * @throws {Error} Fails if no position is open for the symbol, or if given
   *   invalid order parameters
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.closePosition = (params) => closePosition(strategy, params)

  /**
   * Closes a position with a limit order
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name closePositionLimit
   * @throws {Error} Fails if no position is open for the symbol, or if given
   *   invalid order parameters
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.closePositionLimit = (params) => closePositionLimit(strategy, params)

  /**
   * Closes a position with a market order
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name closePositionMarket
   * @throws {Error} Fails if no position is open for the symbol, or if given
   *   invalid order parameters
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.closePositionMarket = (params) => closePositionMarket(strategy, params)

  /**
   * Closes an open position with an order.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name closePositionWithOrder
   * @throws {Error} Fails if no position is open for the symbol, if the
   *   provided order would not close the position, or if given invalid order
   *   parameters
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.closePositionWithOrder = (params) => (
    closePositionWithOrder(strategy, params)
  )

  /**
   * Alias for openPositon
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name openLongPosition
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.openLongPosition = (params) => openLongPosition(strategy, params)

  /**
   * Opens a new long position with a limit order
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name openLongPositionLimit
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.openLongPositionLimit = (params) => openLongPositionLimit(strategy, params)

  /**
   * Opens a new long position with a market order
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name openLongPositionMarket
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.openLongPositionMarket = (params) => (
    openLongPositionMarket(strategy, params)
  )

  /**
   * Opens a position with a new order; resolves to an error if a position is
   * already open.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name openPosition
   * @throws {Error} Fails if a position already exists for the specified
   *   symbol
   *
   * @param {OrderParameters} params - passed directly to order constructor
   * @returns {Promise} p
   */
  h.openPosition = (params) => openPosition(strategy, params)

  /**
   * Opens a new position with a limit order
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name openPositionLimit
   * @throws {Error} Fails if a position already exists for the specified
   *   symbol
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.openPositionLimit = (params) => openPositionLimit(strategy, params)

  /**
   * Opens a new position with a market order. Pulls order timestamp and price
   * from last received data for the order's symbol.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name openPositionMarket
   * @throws {Error} If no timestamp or price data available and none supplied
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.openPositionMarket = (params) => openPositionMarket(strategy, params)

  /**
   * Submits a new order via ws2 with the supplied parameters, creates a new
   * strategy trade and creates a position.
   *
   * If no ws client is available, no data is saved & no order is dispatched
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name openPositionWithOrder
   * @throws {Error} Fails if a position already exists for the specified
   *   symbol
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.openPositionWithOrder = (params) => openPositionWithOrder(strategy, params)

  /**
   * Opens a short position (negates passed amount)
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name openShortPosition
   * @throws {Error} Fails if a position already exists for the specified
   *   symbol
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.openShortPosition = (params) => openShortPosition(strategy, params)

  /**
   * Opens a short position (negates passed amount)
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name openShortPositionLimit
   * @throws {Error} Fails if a position already exists for the specified
   *   symbol
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.openShortPositionLimit = (params) => (
    openShortPositionLimit(strategy, params)
  )

  /**
   * Opens a short position (negates passed amount)
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name openShortPositionMarket
   * @throws {Error} Fails if a position already exists for the specified
   *   symbol
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.openShortPositionMarket = (params) => (
    openShortPositionMarket(strategy, params)
  )

  /**
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name updateLongPosition
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.updateLongPosition = (params) => updateLongPosition(strategy, params)

  /**
   * Updates a long position with a limit order
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name updateLongPositionLimit
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.updateLongPositionLimit = (params) => (
    updateLongPositionLimit(strategy, params)
  )

  /**
   * Updates a long position with a market order
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name updateLongPositionMarket
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.updateLongPositionMarket = (params) => (
    updateLongPositionMarket(strategy, params)
  )

  /**
   * Alias for updatePositionWithOrder
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name updatePosition
   *
   * @param {OrderParameters} params - passed directly to order constructor
   * @returns {Promise} p
   */
  h.updatePosition = (params) => updatePosition(strategy, params)

  /**
   * Updates a position with a limit order
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name updatePositionLimit
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.updatePositionLimit = (params) => updatePositionLimit(strategy, params)

  /**
   * Updates a new position with a market order. Pulls order timestamp and
   * price from last received data for the order's symbol.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name updatePositionMarket
   * @throws {Error} If no timestamp or price data available and none supplied
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.updatePositionMarket = (params) => updatePositionMarket(strategy, params)

  /**
   * Submits a new order via ws2 with the supplied parameters, creates a new
   * strategy trade and updates the current position.
   *
   * If no ws client is available, no data is saved & no order is dispatched
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name updatePositionWithOrder
   * @throws {Error} Fails if no position is open for the symbol, if the order
   *   would close the position, or if given invalid order parameters
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.updatePositionWithOrder = (params) => (
    updatePositionWithOrder(strategy, params)
  )

  /**
   * Updates a short position (negates passed amount)
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name updateShortPosition
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.updateShortPosition = (params) => updateShortPosition(strategy, params)

  /**
   * Updates a short position (negates passed amount)
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name updateShortPositionLimit
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.updateShortPositionLimit = (params) => (
    updateShortPositionLimit(strategy, params)
  )

  /**
   * Updates a short position (negates passed amount)
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name updateShortPositionMarket
   *
   * @param {OrderParameters} params - order parameters
   * @returns {Promise} p
   */
  h.updateShortPositionMarket = (params) => (
    updateShortPositionMarket(strategy, params)
  )

  /**
   * Calls the provided async function if no position is open for the symbol
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name withNoPosition
   *
   * @param {string} [symbol] - symbol
   * @param {Function} f - async function to call if no position is open
   * @returns {Promise} p
   */
  h.withNoPosition = (symbol, f) => withNoPosition(strategy, symbol, f)

  /**
   * Calls the provided async function with the position if it is open
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name withPosition
   *
   * @param {string} [symbol] - symbol
   * @param {Function} f - async function to call if position is open
   * @returns {Promise} p
   */
  h.withPosition = (symbol, f) => withPosition(strategy, symbol, f)

  /**
   * Evaluates whether the time since the last strategy trade is greater than
   * the specified interval in milliseconds.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name minTradeIntervalMet
   *
   * @param {number} intervalMS - interval in milliseconds
   * @returns {boolean} intervalMet
   */
  h.minTradeIntervalMet = (intervalMS) => {
    const lastTrade = _last(getStrategyTrades(strategy))

    return lastTrade
      ? Date.now() - lastTrade.mts > intervalMS
      : true
  }

  /**
   * Get the most recently seen trade
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name lastTrade
   *
   * @param {number} [n=0] - trade index
   * @returns {bfx-api-node-models.PublicTrade} trade
   */
  h.lastTrade = (n = 0) => {
    const trades = getStrategyTrades(strategy)
    return trades[trades.length - 1 - n]
  }

  /**
   * Query the number of intervals since the last trade by interval width
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name ticksSinceLastTrade
   *
   * @param {string} [tf] - defaults to strategy tf
   * @returns {number} ticks
   */
  h.ticksSinceLastTrade = (tf) => {
    const _tf = tf || getDefaultTF(strategy)
    const symbol = getDefaultSymbol(strategy)
    const trade = h.lastTrade()
    const { mts } = h.getLastPrice(symbol, _tf)

    return !trade
      ? -1
      : (mts - trade.mts) / TIME_FRAME_WIDTHS[_tf]
  }

  /**
   * Breaks execution if the time since the last strategy trade is less than
   * the specified interval in milliseconds.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name enforceMinTradeInterval
   *
   * @param {number} intervalMS - interval in milliseconds
   */
  h.enforceMinTradeInterval = (intervalMS) => {
    if (!h.minTradeIntervalMet(intervalMS)) {
      breakExec(`min trade interval not met: ${intervalMS}ms`)
    }
  }

  /**
   * Returns the strategy state
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name getState
   *
   * @returns {StrategyState} state
   */
  h.getState = () => strategy

  /**
   * Returns the last received price (from a trade or candle) for the specified
   * symbol/timeframe pair.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name getLastPrice
   *
   * @param {string} symbol - defaults to default strategy symbol
   * @param {string} tf - defaults to default strategy timeframe
   * @returns {number} lastPrice
   */
  h.getLastPrice = (symbol, tf) => getLastPrice(strategy, symbol, tf)

  /**
   * Returns a map of indicator values key'ed by indicator ID
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name indicatorValues
   *
   * @returns {object} values
   */
  h.indicatorValues = () => indicatorValues(strategy)

  /**
   * Returns a map of indicators key'ed by ID
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name indicators
   *
   * @returns {object} indicators
   */
  h.indicators = () => getIndicators(strategy)

  /**
   * Returns true if a position is open for the specified symbol
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name inAPosition
   *
   * @param {string} symbol - defaults to default strategy symbol
   * @returns {boolean} inPosition
   */
  h.inAPosition = (symbol = getDefaultSymbol(strategy)) => {
    return !!getPosition(strategy, symbol)
  }

  /**
   * Returns true if a long position is open for the specified symbol.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name inALongPosition
   *
   * @param {string} symbol - defaults to default strategy symbol
   * @returns {boolean} inLongPosition
   */
  h.inALongPosition = (symbol = getDefaultSymbol(strategy)) => {
    const position = getPosition(strategy, symbol)
    return position && position.amount > 0
  }

  /**
   * Returns true if a short position is open for the specified symbol.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name inAShortPosition
   *
   * @param {string} symbol - defaults to default strategy symbol
   * @returns {boolean} inShortPosition
   */
  h.inAShortPosition = (symbol = getDefaultSymbol(strategy)) => {
    const position = getPosition(strategy, symbol)
    return position && position.amount < 0
  }

  /**
   * Returns a strategy indicator by ID.
   *
   * @private
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @throws {Error} Fails if given an unknown indicator ID. Logs an error if
   *   executing live.
   *
   * @param {string} id - indicator ID
   * @returns {Indicator} indicator
   */
  const indicatorParam = (id) => {
    const i = getIndicator(strategy, id)
    if (!_isObject(i)) {
      safeThrow(strategy, `Unknown indicator ID: ${id}`)
      return null
    }
    return i
  }

  /**
   * Converts an indicator ID or ID.key string into a literal value. Returns
   * the value as-is if it is finite.
   *
   * @private
   * @throws {Error} Fails if not given a string or number
   *
   * @param {string|number} v - indicator ID or literal value
   * @returns {number} value
   */
  const indicatorOrLiteralParamToLiteral = (v) => {
    if (_isFinite(v)) {
      return v
    } else if (_isString(v)) {
      if (_includes(v, '.')) {
        const [iID, vKey] = v.split('.')
        return indicatorParam(iID).v()[vKey]
      } else {
        return indicatorParam(v).v()
      }
    } else {
      throw new Error(`Unknown param ${v}, not number or indicator ID string`)
    }
  }

  /**
   * Interrupts execution if the condition is not meant. Either parameter to
   * the condition can be an indicator ID or literal. If given an indicator
   * ID and the indicator has sub-values (i.e. bollinger bands), the sub-value
   * name can be specified following a dot after the indicator name
   * (i.e. 'bb.middle')
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name condition
   * @throws {Error} Fails if given an unknown indicator ID. Logs an error if
   *   executing live.
   *
   * @param {string|number} a - indicator ID or literal
   * @param {string} condition - one of (=, ==, eq), (!=, !==, neq), (>, gt),
   *   (>=, gte), (<, lt), or (<=, lte)
   * @param {string|number} b - indicator ID or literal
   */
  h.condition = (a, condition, b) => {
    const aV = indicatorOrLiteralParamToLiteral(a)
    const bV = indicatorOrLiteralParamToLiteral(b)
    if (aV === null || bV === null) {
      breakExec('invalid parameters')
    } else if (!evaluateCondition(strategy, aV, condition, bV)) {
      breakExec(`condition not met: ${aV} (${a}) ${condition} ${bV} (${b})`)
    }
  }

  /**
   * Interrupts execution if the specified indicator did not cross the provided
   * literal value. Always breaks execution when given an unknown indicator ID
   * and running live.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name conditionIndicatorCrossed
   * @throws {Error} Fails if an unknown indicator was specified and
   *   backtesting. Logs an error if executing live.
   *
   * @param {string} iID - ID of indicator
   * @param {number} v - literal value
   */
  h.conditionIndicatorCrossed = (iID, v) => {
    const i = indicatorParam(iID)

    if (i === null) {
      breakExec('Invalid parameters')
    } else if (!i.crossed(v)) {
      breakExec(`condition fail: indicator ${iID} did not cross ${v}`)
    }
  }

  /**
   * Interrupts execution if the specified indicators did not cross values.
   * Always breaks execution when given an uknown indicator ID and running
   * live.
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name conditionIndicatorsCrossed
   * @throws {Error} Fails if either indicator ID is unknown and backtesting.
   *   Logs an error if executing live.
   *
   * @param {string} iaID - ID of first indicator
   * @param {string} ibID - ID of second indicator
   */
  h.conditionIndicatorsCrossed = (iaID, ibID) => {
    const iB = indicatorParam(ibID)

    if (iB === null) {
      breakExec('invalid parameters')
    } else {
      h.condition.indicatorCrossed(iaID, iB.v())
    }
  }

  /**
   * Interrupts strategy execution if not in a position for the specified
   * symbol
   *
   * @memberof module:bfx-hf-strategy/RuntimeHelpers
   * @name conditionInAPosition
   *
   * @param {string} symbol - defaults to default strategy symbol
   */
  h.conditionInAPosition = (symbol = getDefaultSymbol(strategy)) => {
    if (!h.inAPosition(symbol)) {
      throw new ErrorInterruptExec('condition fail: not in a position')
    }
  }

  return h
}

module.exports = initHelpersForStrategy
