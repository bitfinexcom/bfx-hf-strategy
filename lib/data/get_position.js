'use strict'

const _isString = require('lodash/isString')
const getDefaultSymbol = require('./get_default_symbol')

module.exports = (state = {}, forSymbol) => {
  const { positions = {} } = state
  const symbol = forSymbol || getDefaultSymbol(state)

  if (!_isString(symbol)) {
    throw new Error('no default symbol provided')
  }

  return positions[symbol] || null
}
