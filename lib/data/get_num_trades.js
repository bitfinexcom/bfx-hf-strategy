'use strict'

const getTrades = require('./get_trades')

/**
 * @param {Object} state
 * @param {string} symbol - defaults to strategy symbol
 * @return {number} numTrades
 */
module.exports = (state = {}, symbol) => {
  return getTrades(state, symbol).length
}
