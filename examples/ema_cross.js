'use strict'

process.env.DEBUG = '*'

const debug = require('debug')('bfx:hf:strategy:examples:ema-cross')
const { EMA } = require('bfx-hf-indicators')
const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
const { Candle } = require('bfx-api-node-models')
const { execOffline } = require('bfx-hf-backtest')

const rawCandleData = require('./btc_candle_data.json')
const HFS = require('../')

const SYMBOL = SYMBOLS.LEO_USD
const TIME_FRAME = TIME_FRAMES.ONE_MINUTE

// During real execution, candles can arrive from any market/at any time (if
// sub'ed to multiple time frames); hence, each candle must include its origin
// symbol/time frame pair.
const market = {
  symbol: SYMBOLS.BTC_USD,
  tf: TIME_FRAMES.ONE_HOUR
}

const candles = rawCandleData
  .sort((a, b) => a[0] - b[0])
  .map(c => ({
    ...(new Candle(c).toJS()),
    ...market // attach market data
  }))

const strategy = HFS.define({
  id: 'ema_cross',
  name: 'ema_cross',
  symbol: SYMBOL,
  tf: TIME_FRAME,

  // Assumes LEO balance > 1 and trading w/ affiliate code
  takerFee: (0.0002 * 0.95) * 0.85,
  makerFee: (0.0001 * 0.95) * 0.85,

  simulateLiveCandleEnabled: false,

  indicators: {
    l: new EMA([100]),
    s: new EMA([20])
  },

  onPriceUpdate: async function () {
    const { s, l } = this.indicatorValues()

    await this.condition.indicatorsCrossed('s', 'l')

    if (!this.inAPosition()) {
      return this.openPositionMarket({ amount: s > l ? 6 : -6 })
    } else {
      return this.closePositionMarket()
    }
  }
})

execOffline(strategy, { candles }).catch((e) => {
  debug('error: %s', e.message)
})
