'use strict';

const getPosition = require('./get_position');
/**
 * Queries if a short position is open for the specified symbol
 *
 * @param {StrategyState} state - strategy state
 * @param {string} [forSymbol] - defaults to strategy symbol
 * @returns {boolean} isShort
 */


const isShort = (state = {}, forSymbol) => {
  const position = getPosition(state, forSymbol);
  return position.amount < 0;
};

module.exports = isShort;