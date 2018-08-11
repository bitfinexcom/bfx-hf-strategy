'use strict'

process.env.DEBUG = '*'

const { Candle } = require('bitfinex-api-node/lib/models')
const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
const logTrades = require('../lib/debug/log_trades')
const HFS = require('../')

const EMAStrategy = require('./ema_cross')
const rawCandleData = require('./btc_candle_data.json')

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

const run = async () => {
  let stratState = EMAStrategy(market)

  for (let i = 0; i < candles.length; i += 1) {
    stratState = await HFS.onCandle(stratState, candles[i])
  }

  stratState = await HFS.closeOpenPositions(stratState)

  logTrades(stratState)
}

try {
  run()
} catch (e) {
  console.error(e)
}
