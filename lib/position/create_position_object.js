'use strict'

const _includes = require('lodash/includes')
const { SYMBOLS } = require('bfx-hf-util')
const getDefaultSymbol = require('../data/get_default_symbol')

const SYMBOL_LIST = Object.values(SYMBOLS)

/**
 * Creates a new/fresh position object, as used by the internal strategy state
 *
 * @memberof module:Positions
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 * @param {module:bfx-hf-strategy.PositionParameters} args - parameters
 * @returns {module:bfx-hf-strategy.StrategyPosition} position - position
 * @throws {Error} fails if given an unknown symbol
 */
module.exports = (state = {}, args = {}) => {
  const { price, amount, trades = [], tag = '' } = args
  const symbol = args.symbol || getDefaultSymbol(state)

  if (!_includes(SYMBOL_LIST, symbol)) {
    throw new Error('unknown symbol: %s', symbol)
  }

  return {
    symbol,
    price,
    amount,
    trades,
    tag
  }
}
