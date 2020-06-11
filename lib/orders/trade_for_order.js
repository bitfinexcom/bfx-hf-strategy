'use strict'

const { nonce } = require('bfx-api-node-util')
const getDefaultSymbol = require('../data/get_default_symbol')
const indicatorValues = require('../indicators/indicator_values')

/**
 * Returns a strategy trade object for the provided bfx order model.
 *
 * @private
 * @throws {Error} Fails if the order is not fully filled
 *
 * @param {StrategyState} state - strategy state
 * @param {bfx-api-node-models.Order} order - order properties as on node API
 *   model
 * @param {string} [label] - descriptive label for the trade
 * @param {string} [tag] - tag indicating trade reason/metadata
 * @returns {StrategyTrade} trade
 */
const tradeForOrder = (state = {}, order = {}, label = '', tag = '') => {
  const { backtesting, makerFee, takerFee } = state
  const {
    amount, amountOrig, status, id, price, priceAvg, mtsCreate,
    symbol = getDefaultSymbol(state), maker
  } = order

  if (amount !== 0) {
    throw new Error(
      `order not fully filled, refusing to create trade (${amount}/${amountOrig})`
    )
  }

  const iv = indicatorValues(state)
  const fillAmount = amountOrig - amount
  const fillPrice = priceAvg
  const fillFeePerc = maker ? makerFee : takerFee
  const fillFee = Math.abs(fillPrice * fillAmount) * fillFeePerc

  return {
    symbol,
    label,
    tag,

    amount: fillAmount,
    price: fillPrice,
    pl: 0,

    mts: mtsCreate,
    mtsCreate: mtsCreate,
    orderID: backtesting ? nonce() : id,
    orderPrice: price,
    orderStatus: status,
    orderJS: order.toJS(),

    maker: null,
    fee: fillFee,
    feeCCY: null,
    positionID: null,

    iv
  }
}

module.exports = tradeForOrder
