'use strict'

const _isFinite = require('lodash/isFinite')

/**
 * Returns the P/L figure for the specified position, taking into account all
 * trades & a close with the provided price (optional)
 *
 * @param {Object} position
 * @param {number?} closePrice - optional, used if position not already closed
 * @return {number} pl
 */
module.exports = (position, closePrice) => {
  const { trades = [] } = position

  if (trades.length === 0) {
    return 0
  }

  let nv = 0
  let fees = 0

  trades.forEach(trade => {
    fees += trade.fee
    nv += trade.price * trade.amount
  })

  if (_isFinite(closePrice) && position.amount !== 0) {
    const closeNV = closePrice * (-position.amount)

    fees += Math.abs(closeNV * 0.002)
    nv += closeNV
  }

  return -nv - fees
}
