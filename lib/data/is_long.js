'use strict'

const getPosition = require('./get_position')

/**
 * Queries if a long position is open for the specified symbol
 *
 * @param {object} state
 * @param forSymbol
 * @param {string?} symbol - optional, defaults to strategy symbol
 * @return {boolean} isLong
 */
const isLong = (state = {}, forSymbol) => {
  const position = getPosition(state, forSymbol)

  return position.amount > 0
}

module.exports = isLong
