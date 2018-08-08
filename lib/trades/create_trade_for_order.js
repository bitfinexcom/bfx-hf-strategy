'use strict'

const createRawTradeForOrder = require('./create_raw_trade_for_order')
const { StrategyTrade } = require('bfx-hf-db')

module.exports = async (state = {}, order = {}, label = '') => {
  const rawTrade = createRawTradeForOrder(state, order, label)

  return StrategyTrade
    .query()
    .insert(rawTrade)
}
