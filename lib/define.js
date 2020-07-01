'use strict'

const debug = require('debug')('bfx:hf:strategy:define')
const _isFunction = require('lodash/isFunction')

const initHelpersForStrategy = require('./helpers')
const { execPluginHandler } = require('./plugins')

const DEFAULT_MAKER_FEE = 0.001
const DEFAULT_TAKER_FEE = 0.002

/**
 * Returns an initial strategy state object for the provided arguments. The
 * state object can then be used with the various HF strategy methods.
 *
 * @memberof module:bfx-hf-strategy
 *
 * @param {module:bfx-hf-strategy.StrategyDefinition} args - definition
 * @returns {module:bfx-hf-strategy.StrategyState} state - strategy state
 */
const defineStrategy = (args = {}) => {
  if (!_isFunction(args.exec)) {
    throw new Error('Strategy exec() handler required')
  }

  // NOTE: This is the only non-async plugin handler!
  execPluginHandler(args, 'onInit', args).catch((err) => {
    debug('plugin init error: %s', err.message)
  })

  const strategy = {
    candlePrice: 'close',
    ...args,
    marketData: {},
    positions: {}, // key'd by symbol
    trades: []
  }

  if (!strategy.makerFee) {
    debug('WARNING: defaulting to %f% maker fee', DEFAULT_MAKER_FEE * 100)
    strategy.makerFee = DEFAULT_MAKER_FEE
  } else {
    debug('running with %f% maker fee', strategy.makerFee * 100)
  }

  if (!strategy.takerFee) {
    debug('WARNING: defaulting to %f% taker fee', DEFAULT_TAKER_FEE * 100)
    strategy.takerFee = DEFAULT_TAKER_FEE
  } else {
    debug('running with %f% taker fee', strategy.takerFee * 100)
  }

  strategy.h = initHelpersForStrategy(strategy)

  // Bind handler to the helper function so it can be accessed via this
  strategy.exec = strategy.exec.bind(strategy.h)

  return strategy
}

module.exports = defineStrategy
