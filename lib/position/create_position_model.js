'use strict'

const _isFinite = require('lodash/isFinite')
const { StrategyPosition } = require('bfx-hf-db')

// Convert NaN to null
const nullPrice = price => _isFinite(price) ? price : null

module.exports = async (strategyState = {}, data = {}) => {
  const { model } = strategyState
  const {
    symbol, amount, stop, target, price
  } = data

  return StrategyPosition
    .query()
    .insert({
      symbol,
      amount,
      price,
      strategy_id: model.id, // eslint-disable-line
      stop_price: nullPrice(stop), // eslint-disable-line
      target_price: nullPrice(target), // eslint-disable-line
      stop_limit_price: nullPrice(stopLimit), // eslint-disable-line
      target_limit_price: nullPrice(targetLimit) // eslint-disable-line
    })
}
