'use strict'

process.env.DEBUG = '*'

const debug = require('debug')('bfx:hf:strategy:examples:ema-cross')
const { EMA } = require('bfx-hf-indicators')
const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
const { Candle } = require('bfx-api-node-models')
const { execOffline } = require('bfx-hf-backtest')
const HFSData = require('bfx-hf-strategy-data')
const HFS = require('../')

const SYMBOL = SYMBOLS.LEO_USD
const TIME_FRAME = TIME_FRAMES.ONE_MINUTE

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

const run = async () => {
  const candleKey = HFS.candleMarketDataKey({
    symbol: SYMBOL,
    tf: TIME_FRAME
  })

  return execOffline(strategy, {
    candles: {
      [candleKey]: HFSData['trade:1m:tLEOUSD'].map(arr => ({
        ...new Candle(arr),
        symbol: SYMBOL,
        tf: TIME_FRAME
      }))
    }
  })
}

try {
  run()
} catch (e) {
  debug('error: %s', e.message)
}
