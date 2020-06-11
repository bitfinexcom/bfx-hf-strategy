'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const debug = require('debug')('bfx:hf:strategy:define');

const _isFunction = require('lodash/isFunction');

const initHelpersForStrategy = require('./helpers');

const _require = require('./plugins'),
      execPluginHandler = _require.execPluginHandler;

const DEFAULT_MAKER_FEE = 0.001;
const DEFAULT_TAKER_FEE = 0.002;
/**
 * Returns an initial strategy state object for the provided arguments. The
 * state object can then be used with the various HF strategy methods.
 *
 * @param {StrategyDefinition} args - definition
 * @returns {StrategyState} state - strategy state
 */

const defineStrategy = (args = {}) => {
  if (!_isFunction(args.exec)) {
    throw new Error('Strategy exec() handler required');
  } // NOTE: This is the only non-async plugin handler!


  execPluginHandler(args, 'onInit', args).catch(err => {
    debug('plugin init error: %s', err.message);
  });

  const strategy = _objectSpread(_objectSpread({
    candlePrice: 'close'
  }, args), {}, {
    marketData: {},
    positions: {},
    // key'd by symbol
    trades: []
  });

  if (!strategy.makerFee) {
    debug('WARNING: defaulting to %f% maker fee', DEFAULT_MAKER_FEE * 100);
    strategy.makerFee = DEFAULT_MAKER_FEE;
  } else {
    debug('running with %f% maker fee', strategy.makerFee * 100);
  }

  if (!strategy.takerFee) {
    debug('WARNING: defaulting to %f% taker fee', DEFAULT_TAKER_FEE * 100);
    strategy.takerFee = DEFAULT_TAKER_FEE;
  } else {
    debug('running with %f% taker fee', strategy.takerFee * 100);
  }

  strategy.h = initHelpersForStrategy(strategy); // Bind handler to the helper function so it can be accessed via this

  strategy.exec = strategy.exec.bind(strategy.h);
  return strategy;
};

module.exports = defineStrategy;