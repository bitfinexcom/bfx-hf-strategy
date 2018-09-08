'use strict'

const _isFinite = require('lodash')
const { Order } = require('bitfinex-api-node/lib/models')
// const { SYMBOL_LIST } = require('../../config')

const getDefaultSymbol = require('../data/get_default_symbol')

module.exports = (state = {}, orderParams = {}) => {
  const {
    symbol = getDefaultSymbol(state),
    type,
    amount
  } = orderParams

  if (!_isFinite(amount)) {
    throw new Error(`invalid amount provided: ${amount}`)
  } else if (!Order.type[type]) {
    throw new Error(`unrecognized order type: ${type}`)
  // } else if (SYMBOL_LIST[symbol] === -1) {
  //   throw new Error(`unrecognized symbol: ${symbol}`)
  }
}
