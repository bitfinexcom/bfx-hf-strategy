'use strict'

const generateClientId = require('../util/generate_client_id')
const getDefaultSymbol = require('../data/get_default_symbol')
const indicatorValues = require('../indicators/indicator_values')
const BigNumber = require('bignumber.js')

const makerFee = 0.0008
const takerFee = 0.002

/**
 * Returns a POJO trade object for the provided bfx order model
 *
 * @param {Object} state
 * @param {Object} order - order properties as on node API model
 * @param {string?} params.label - optional descriptive label for the trade
 * @param {string?} params.tag - optional tag indicating trade reason/metadata
 * @param {Object|null} fees
 * @return {Object} trade
 */
module.exports = (state = {}, order = {}, params, fees) => {
  const { backtesting } = state
  const { label = '', tag = '' } = params
  const {
    amount, amountOrig, status, id, price, priceAvg, mtsCreate,
    symbol = getDefaultSymbol(state)
  } = order

  if (amount !== 0) {
    throw new Error(
      `order not fully filled, refusing to create trade (${amount}/${amountOrig})`
    )
  }

  const iv = indicatorValues(state)
  const fillAmount = amountOrig - amount
  const fillPrice = priceAvg
  const fee = order.type.includes('LIMIT') ? makerFee : takerFee

  return {
    symbol,
    label,
    tag,

    amount: fillAmount,
    price: fillPrice,
    pl: 0,
    realizedPnl: new BigNumber(0),

    mts: mtsCreate,
    mts_create: mtsCreate,
    order_id: backtesting ? generateClientId() : id,
    order_price: price,
    order_status: status,
    order_js: order.toJS(),

    maker: null,
    fee,

    strategy_id: null,
    position_id: null,

    iv
  }
}
