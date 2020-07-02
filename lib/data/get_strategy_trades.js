'use strict'

/**
 * Returns an array of trades executed by the strategy
 *
 * @param {StrategyState} state - strategy state
 * @returns {StrategyTrade[]} trades - sorted oldest first
 */
const getStrategyTrades = (state = {}) => {
  const { trades = [] } = state
  return trades
}

module.exports = getStrategyTrades
