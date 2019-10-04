'use strict'

const _isString = require('lodash/isString')
const getDefaultSymbol = require('./get_default_symbol')

/**
 * Returns the position for the specified symbol
 *
 * @param {Object} state
 * @param {string?} forSymbol - optional, defaults to strategy symbol
 * @return {Object} position - may be null
 */
const getPosition = (state = {}, forSymbol) => {
  const { positions = {} } = state
  const symbol = forSymbol || getDefaultSymbol(state)

  if (!_isString(symbol)) {
    throw new Error('no default symbol provided')
  }

  return positions[symbol] || null
}

module.exports = getPosition
