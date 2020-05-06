'use strict'

const getPosition = require('./get_position')

/**
 * Queries if a long position is open for the specified symbol
 *
 * @memberof module:Data
 *
 * @param {StrategyState} state - strategy state
 * @param {string} [forSymbol] - defaults to strategy symbol
 * @returns {boolean} isLong
 */
const isLong = (state = {}, forSymbol) => {
  const position = getPosition(state, forSymbol)

  return position.amount > 0
}

module.exports = isLong
