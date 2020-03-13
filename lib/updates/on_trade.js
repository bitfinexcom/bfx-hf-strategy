'use strict'

const {
  indicatorsReady, updateIndicatorData
} = require('../indicators')

const onPriceUpdate = require('./on_price_update')
const addTradeData = require('../data/add_trade_data')

/**
 * Called for an incoming (new) trade. Propagates the trade via onPriceUpdate
 *
 * @param {object} state - strategy state
 * @param {Trade} trade - trade
 * @return {Promise} p - resolves to nextState
 */
const onTrade = async (state = {}, trade = {}) => {
  const { mts, price, symbol } = trade

  updateIndicatorData(state, 'trade', price)
  addTradeData(state, trade)

  if (indicatorsReady(state)) {
    return onPriceUpdate(state, {
      mts,
      price,
      trade,
      symbol,
      type: 'trade'
    })
  }

  state.lastTrade = trade

  return state
}

module.exports = onTrade
