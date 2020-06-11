'use strict';

const _isObject = require('lodash/isObject');

const _isFinite = require('lodash/isFinite');

const getDefaultSymbol = require('../data/get_default_symbol');

const getPosition = require('../data/get_position');
/**
 * Returns the P/L figure for the specified position, taking into account all
 * trades and optionally a close with the provided price.
 *
 * @param {StrategyState} state - strategy state
 * @param {string} [_symbol] - defaults to default strat symbol
 * @param {number} [closePrice] - used if position not already closed
 * @returns {number} pl
 */


const positionPL = (state = {}, _symbol, closePrice) => {
  const symbol = _symbol || getDefaultSymbol(state);

  const position = getPosition(state, symbol);

  if (!_isObject(position)) {
    return 0;
  }

  const _position$trades = position.trades,
        trades = _position$trades === void 0 ? [] : _position$trades;

  if (trades.length === 0) {
    return 0;
  }

  let nv = 0;
  trades.forEach(trade => {
    nv += trade.price * trade.amount - trade.fee;
  });

  if (_isFinite(closePrice) && position.amount !== 0) {
    const closeNV = closePrice * -position.amount;
    const closeFee = Math.abs(closeNV * 0.002);
    nv += closeNV - closeFee;
  }

  return nv;
};

module.exports = positionPL;