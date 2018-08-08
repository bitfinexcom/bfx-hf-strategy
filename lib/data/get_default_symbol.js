'use strict'

/**
 * Returns the default symbol for the strategy; a strategy can have either a
 * set of multiple symbols, a single default 'symbol' defined, or both.
 *
 * @param {Object} strategyState
 * @return {string} defaultSymbol
 */
module.exports = (strategyState = {}) => {
  const { symbol } = strategyState
  return symbol
}
