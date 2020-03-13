'use strict'

const _isFinite = require('lodash/isFinite')
const { Order } = require('bfx-api-node-models')
const { SYMBOLS } = require('bfx-hf-util')
const getDefaultSymbol = require('../data/get_default_symbol')

const SYMBOL_LIST = Object.values(SYMBOLS)

/**
 * Ensures the provided parameters contain an amount, valid type, and valid
 * symbol
 *
 * @memberOf module:Orders
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {OrderParameters} orderParams - order parameters
 * @throws {Error} throws if given an invalid amount, order type or symbol
 */
const validateOrderParams = (state = {}, orderParams = {}) => {
  const {
    symbol = getDefaultSymbol(state),
    type,
    amount
  } = orderParams

  if (!_isFinite(amount)) {
    throw new Error(`invalid amount provided: ${amount}`)
  } else if (!Order.type[type]) {
    throw new Error(`unrecognized order type: ${type}`)
  } else if (SYMBOL_LIST[symbol] === -1) {
    throw new Error(`unrecognized symbol: ${symbol}`)
  }
}

module.exports = validateOrderParams
