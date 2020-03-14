'use strict'

/**
 * Returns an array of trades executed by the strategy
 *
 * @memberOf module:Data
 *
 * @param {StrategyState} state - strategy state
 * @returns {StrategyTrade[]} trades - sorted oldest first
 */
const getStrategyTrades = (state = {}, symbol = null) => {
  const { trades = [] } = state
  return trades
}

module.exports = getStrategyTrades
