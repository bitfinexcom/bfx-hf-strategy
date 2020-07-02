'use strict'

const _isEmpty = require('lodash/isEmpty')
const debug = require('debug')('bfx:hf:strategy:position:close-all-open')
const closePositionMarket = require('./close_position_market')
const getLastPrice = require('../data/get_last_price')
const getPosition = require('../data/get_position')

/**
 * Closes all open positions with market orders
 *
 * @param {StrategyState} state - strategy state
 * @returns {Promise} p
 */
const closeOpenPositions = async (state = {}) => {
  const { backtesting } = state
  const symbols = Object.keys(state.positions)

  if (_isEmpty(symbols)) {
    return
  }

  let symbol

  if (!backtesting) {
    debug(
      'closing %d open positions [%s]',
      symbols.length, symbols.join(', ')
    )
  }

  for (let i = 0; i < symbols.length; i += 1) {
    symbol = symbols[i]

    const p = getPosition(state, symbol)
    const lastPrice = getLastPrice(state, symbol)

    if (!lastPrice) {
      continue
    }

    const { mts, price } = lastPrice

    if (!backtesting) {
      debug(
        'closing position on %s (%f @ %f) with MARKET (%f) [%d]',
        symbol, p.amount, p.price, price, mts
      )
    }

    await closePositionMarket(state, {
      symbol,
      mts,
      price,
      label: 'close open positions'
    })
  }
}

module.exports = closeOpenPositions
