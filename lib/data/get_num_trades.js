'use strict'

const getTrades = require('./get_trades')

/**
 * Returns the number of received trades for the specified symbol/timeframe
 * pair.
 *
 * @memberof module:Data
 *
 * @param {StrategyState} state - strategy state
 * @param {string} symbol - defaults to strategy symbol
 * @returns {number} numTrades
 */
const getNumTrades = (state = {}, symbol) => {
  return getTrades(state, symbol).length
}

module.exports = getNumTrades
