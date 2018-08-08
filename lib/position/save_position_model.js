'use strict'

const { StrategyPosition } = require('bfx-hf-db')

module.exports = async (strategyState = {}, data = {}) => {
  const { model } = strategyState
  const {
    symbol, amount, stop, target, price, entryTrade, exitTrade
  } = data

  let sql = StrategyPosition
    .query()
    .insert({
      symbol,
      amount,
      price,

      stop_price: stop, // eslint-disable-line
      target_price: target, // eslint-disable-line

      strategy_id: model.id,
      entry_trade_id: entryTrade ? entryTrade.id : null,
      exit_trade_id: exitTrade ? exitTrade.id : null
    })
    .toString()

  sql = sql.replace(/^insert/i, 'insert or update')

  return StrategyPosition.knex().raw(sql)
}
