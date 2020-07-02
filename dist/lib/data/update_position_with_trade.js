'use strict';
/**
 * Adds the trade to the position state
 *
 * @param {Position} position - position
 * @param {bfx-api-node-models.PublicTrade} trade - trade
 */

const updatePositionWithTrade = (position, trade) => {
  const totalAmount = position.amount + trade.amount;
  const posNV = position.amount * position.price;
  const tradeNV = trade.amount * trade.price;
  position.amount = totalAmount;
  position.price = (posNV + tradeNV) / totalAmount;
  position.trades.push(trade);
};

module.exports = updatePositionWithTrade;