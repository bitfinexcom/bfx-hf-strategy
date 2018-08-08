'use strict'

const _isFinite = require('lodash/isFinite')
const { StrategyPosition } = require('bfx-hf-strategy')

// Convert NaN to null
const nullPrice = price => _isFinite(price) ? price : null

module.exports = async (state = {}, data = {}) => {
  const {
    id, symbol, amount, price, stop, target, stopLimitOffset, targetLimitOffset
  } = data

  const stopLimit = data.stopLimit || stop + stopLimitOffset
  const targetLimit = data.targetLimit || target + targetLimitOffset

  return StrategyPosition
    .query()
    .where({ id })
    .update({
      symbol,
      amount,
      price,
      stop_price: nullPrice(stop), // eslint-disable-line
      target_price: nullPrice(target), // eslint-disable-line
      stop_limit_price: nullPrice(stopLimit), // eslint-disable-line
      target_limit_price: nullPrice(targetLimit) // eslint-disable-line
    })
}
