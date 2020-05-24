'use strict'

/**
 * Returns an array of trades executed by the strategy
 *
 * @memberof module:bfx-hf-strategy
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @returns {module:bfx-hf-strategy.StrategyTrade[]} trades - sorted oldest
 *   first
 */
const getStrategyTrades = (state = {}, symbol = null) => {
  const { trades = [] } = state
  return trades
}

module.exports = getStrategyTrades
