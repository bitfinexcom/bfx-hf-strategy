'use strict'

/**
 * Returns the default symbol for the strategy; a strategy can have either a
 * set of multiple symbols, a single default 'symbol' defined, or both.
 *
 * @param {object} strategyState
 * @return {string} defaultSymbol
 */
const getDefaultSymbol = (strategyState = {}) => {
  const { symbol } = strategyState
  return symbol
}

module.exports = getDefaultSymbol
