'use strict'

const {
  indicatorsReady, updateIndicatorData
} = require('../indicators')

const onPriceUpdate = require('./on_price_update')
const addTradeData = require('../data/add_trade_data')

/**
 * Called for an incoming (new) trade. Propagates the trade via onPriceUpdate
 *
 * @memberof module:UpdateHandlers
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {Trade} trade - trade
 * @returns {Promise} p
 */
const onTrade = async (state = {}, trade = {}) => {
  const { mts, price, symbol } = trade

  updateIndicatorData(state, 'trade', price)
  addTradeData(state, trade)

  if (indicatorsReady(state)) {
    await onPriceUpdate(state, {
      mts,
      price,
      trade,
      symbol,
      type: 'trade'
    })
  }
}

module.exports = onTrade
