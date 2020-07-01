'use strict'

const _isFunction = require('lodash/isFunction')
const _includes = require('lodash/includes')
const _isFinite = require('lodash/isFinite')
const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const _isArray = require('lodash/isArray')

const VALID_CANDLE_PRICES = ['open', 'high', 'low', 'close']

/**
 * Validate a strategy instance
 *
 * @throws {Error} fails if given an invalid strategy instance
 * @memberof module:bfx-hf-strategy
 * @see {@link module:bfx-hf-strategy.StrategyState|StrategyState}
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - state to validate
 */
const validateStrategy = (state = {}) => {
  let err = null

  if (!_isObject(state)) {
    err = 'Strategy instance must be an object'
  } else {
    const {
      id, name, makerFee, takerFee, plugins, symbol, tf, candlePrice,
      indicators, exec
    } = state

    if (!_isString(id) || _isEmpty(id)) {
      err = 'ID must be a non-empty string'
    } else if (!_isString(name) || _isEmpty(name)) {
      err = 'Name must be a non-empty string'
    } else if (
      !_isFinite(makerFee) || !_isFinite(takerFee) || makerFee < 0 ||
      takerFee <= 0
    ) {
      err = 'Maker/taker fees must be postiive numbers'
    } else if (!_isEmpty(plugins) && !_isArray(plugins)) {
      err = 'Plugins must be an array if provided'
    } else if (!_isString(symbol) || _isEmpty(symbol)) {
      err = 'Default symbol must be a non-empty string if provided'
    } else if (!_isString(tf) || _isEmpty(tf)) {
      err = 'Default time frame must be a non-empty string if provided'
    } else if (
      !_isString(candlePrice) || _isEmpty(candlePrice) ||
      !_includes(VALID_CANDLE_PRICES, candlePrice)
    ) {
      err = (
        `Candle price must be one of ${VALID_CANDLE_PRICES.join(',')} if given`
      )
    } else if (!_isEmpty(indicators) && !_isObject(indicators)) {
      err = 'Indicators map must be an object if provided'
    } else if (!_isFunction(exec)) {
      err = 'Exec function is required'
    }
  }

  if (err !== null) {
    throw new Error(err)
  }
}

module.exports = validateStrategy
