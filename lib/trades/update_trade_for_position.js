'use strict'

const { StrategyTrade } = require('bfx-hf-db')

module.exports = async (strategyState = {}, trade = {}, position = {}) => {
  return StrategyTrade
    .query()
    .where('id', trade.id)
    .update({
      position_id: position.id // eslint-disable-line
    })
    .limit(1)
}
