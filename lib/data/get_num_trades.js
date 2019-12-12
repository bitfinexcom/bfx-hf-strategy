'use strict'

const getTrades = require('./get_trades')

/**
 * @param {Object} state
 * @param {string} symbol - defaults to strategy symbol
 * @return {number} numTrades
 */
const getNumTrades = (state = {}, symbol) => {
  return getTrades(state, symbol).length
}

module.exports = getNumTrades
