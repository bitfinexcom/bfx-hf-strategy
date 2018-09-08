'use strict'

const _isObject = require('lodash/isObject')

module.exports = (state = {}, order = {}) => {
  const { positions = {} } = state
  const { symbol } = order
  const position = positions[symbol]

  if (!_isObject(position)) {
    throw new Error(`no position exists for symbol ${symbol}`)
  }

  if (position.amount + order.amount === 0) {
    throw new Error('order would close existing position')
  }
}
