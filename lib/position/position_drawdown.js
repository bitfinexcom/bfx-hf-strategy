'use strict'

const _isObject = require('lodash/isObject')
const removeDust = require('../util/remove_dust')
const getPosition = require('../data/get_position')
const getDefaultSymbol = require('../data/get_default_symbol')

const positionDrawdown = (state = {}, _symbol, currentPrice) => {
  const symbol = _symbol || getDefaultSymbol(state)
  const position = getPosition(state, symbol)

  if (!_isObject(position)) {
    return 0
  }

  const { amount } = position
  const equityValue = removeDust(amount * currentPrice)

  if (equityValue > position.peak) {
    position.prevPeak = position.peak
    position.peak = equityValue
  }

  if (equityValue < position.trough) {
    position.trough = equityValue
  }

  const diff = removeDust(position.prevPeak - position.trough)
  const drawdown = removeDust(diff / position.prevPeak)

  return drawdown
}

module.exports = positionDrawdown
