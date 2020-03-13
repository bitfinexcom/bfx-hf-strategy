'use strict'

const debug = require('debug')('bfx:hf:strategy:position:close-all-open')
const closePositionMarket = require('./close_position_market')
const getLastPrice = require('../data/get_last_price')
const getPosition = require('../data/get_position')

/**
 * Closes all open positions with market orders
 *
 * @param {object} state
 * @return {Promise} p - resolves to nextState
 */
const closeOpenPositions = async (state = {}) => {
  const { backtesting } = state
  let strategyState = state

  const symbols = Object.keys(state.positions)

  if (symbols.length > 0) {
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
      const lastPrice = getLastPrice(strategyState, symbol)

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

      strategyState = await closePositionMarket(strategyState, {
        symbol,
        mts,
        price,
        label: 'close open positions'
      })
    }
  }

  return strategyState
}

module.exports = closeOpenPositions
