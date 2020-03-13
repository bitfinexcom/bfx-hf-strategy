'use strict'

const _isObject = require('lodash/isObject')

/**
 * @memberOf module:Errors
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {Order} order - order
 * @throws {Error} throws if no position exists for the order or the order
 *   would close an existing position.
 */
const throwsIfOrderClosesPosition = (state = {}, order = {}) => {
  const { positions = {} } = state
  const { symbol } = order
  const position = positions[symbol]

  if (!_isObject(position)) {
    throw new Error(`no position exists for symbol ${symbol}`)
  }

  if (position.amount + order.amount === 0) {
    throw new Error('order would close existing position')
  }
}

module.exports = throwsIfOrderClosesPosition
