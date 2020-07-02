'use strict';

const _isFinite = require('lodash/isFinite');
/**
 * Returns the P/L figure for the specified position, taking into account all
 * trades & a close with the provided price (optional)
 *
 * @param {object} position - position
 * @param {number} [closePrice] - used if position not already closed
 * @returns {number} pl
 */


const positionPL = (position, closePrice) => {
  const _position$trades = position.trades,
        trades = _position$trades === void 0 ? [] : _position$trades;

  if (trades.length === 0) {
    return 0;
  }

  let nv = 0;
  let fees = 0;
  trades.forEach(trade => {
    fees += trade.fee;
    nv += trade.price * trade.amount;
  });

  if (_isFinite(closePrice) && position.amount !== 0) {
    const closeNV = closePrice * -position.amount;
    fees += Math.abs(closeNV * 0.002);
    nv += closeNV;
  }

  return -nv - fees;
};

module.exports = positionPL;