'use strict'

const _isObject = require('lodash/isObject')
const {
  getDefaultSymbol, getPosition, getIndicator, getLastPrice
} = require('./data')
const { safeError, ErrorInterruptExec } = require('./errors')
const { indicatorValues } = require('./indicators')
const positionMethods = require('./position')

/**
 * A set of utility functions bound to the strategy they are used in, providing
 * control over strategy execution, access to data, and order manipulation
 * methods.
 *
 * @module Helpers
 */

const initHelpersForStrategy = (strategy = {}) => {
  const h = { condition: {} }

  Object.keys(positionMethods).forEach((positionMethodName) => {
    h[positionMethodName] = (...args) => {
      positionMethods[positionMethodName](strategy, ...args)
    }
  })

  /**
   * Returns the strategy state
   *
   * @memberOf module:Helpers
   *
   * @returns {object} state
   */
  h.getState = () => strategy

  /**
   * Returns the last received price (from a trade or candle) for the specified
   * symbol/timeframe pair.
   *
   * @memberOf module:Helpers
   *
   * @param {string} symbol - defaults to default strategy symbol
   * @param {string} tf - defaults to default strategy timeframe
   * @returns {number} lastPrice
   */
  h.getLastPrice = (symbol, tf) => getLastPrice(strategy, symbol, tf)

  /**
   * Returns a map of indicator values key'ed by indicator ID
   *
   * @memberOf module:Helpers
   *
   * @returns {object} values
   */
  h.indicatorValues = () => indicatorValues(strategy)

  /**
   * Returns true if a position is open for the specified symbol
   *
   * @memberOf module:Helpers
   *
   * @param {string} symbol - defaults to default strategy symbol
   * @returns {boolean} inPosition
   */
  h.inAPosition = (symbol = getDefaultSymbol(strategy)) => {
    return !!getPosition(strategy, symbol)
  }

  /**
   * Interrupts strategy execution if the specified indicators did not cross
   * values.
   *
   * @memberOf module:Helpers
   *
   * @param {string} iaID - ID of first indicator
   * @param {string} ibID - ID of second indicator
   * @throws {Error} Fails if either indicator is unknown and backtesting; logs
   *   an error if executing live
   */
  h.condition.indicatorsCrossed = (iaID, ibID) => {
    const iA = getIndicator(strategy, iaID)
    const iB = getIndicator(strategy, ibID)

    if (!_isObject(iA)) safeError(`unknown indicator: ${iaID}`)
    if (!_isObject(iB)) safeError(`unknown indicator: ${ibID}`)

    if (!iA.crossed(iB.v())) {
      throw new ErrorInterruptExec('condition fail: indicators did not cross')
    }
  }

  /**
   * Interrupts strategy execution if not in a position for the specified
   * symbol
   *
   * @memberOf module:Helpers
   *
   * @param {string} symbol - defaults to default strategy symbol
   */
  h.condition.inAPosition = (symbol = getDefaultSymbol(strategy)) => {
    if (!h.inAPosition(symbol)) {
      throw new ErrorInterruptExec('condition fail: not in a position')
    }
  }

  return h
}

module.exports = initHelpersForStrategy
