'use strict'

/**
 * Returns the default symbol for the strategy; a strategy can have either a
 * set of multiple symbols, a single default 'symbol' defined, or both.
 *
 * @memberOf module:Data
 *
 * @param {StrategyState} state - strategy state
 * @returns {string} defaultSymbol
 */
const getDefaultSymbol = (state = {}) => {
  const { symbol } = state
  return symbol
}

module.exports = getDefaultSymbol
