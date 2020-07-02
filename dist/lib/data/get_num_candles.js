'use strict';

const getCandles = require('./get_candles');
/**
 * Returns the number of received candles for the specified symbol/timeframe
 * pair
 *
 * @param {StrategyState} state - strategy state
 * @param {string} symbol - defaults to strategy symbol
 * @param {string} tf - defaults to strategy time frame
 * @returns {number} numCandles
 */


const getNumCandles = (state = {}, symbol, tf) => {
  return getCandles(state, symbol, tf).length;
};

module.exports = getNumCandles;