'use strict'

process.env.DEBUG = '*'

const FS = require('fs')
const debug = require('debug')('bfx:hf:strategy:examples:render-iv-data')
const { Candle } = require('bfx-api-node-models')
const HFI = require('bfx-hf-indicators')
const rawCandleData = require('./btc_candle_data.json')

const OUTPUT_PATH = `${__dirname}/candle_iv_data.json`
const candles = rawCandleData
  .sort((a, b) => a[0] - b[0])
  .map(c => new Candle(c).toJS())

const iv = []
const indicators = {}

debug('loaded %d candles', candles.length)

Object.keys(HFI).forEach(iName => {
  if (iName === 'Indicator') return

  const C = HFI[iName]
  const args = C.args.map(argDef => argDef.default)
  const key = C.id

  indicators[key] = new C(args)

  debug('created %s instance', iName)
})

candles.forEach(candle => {
  Object.values(indicators).forEach(indicator => {
    const dk = indicator.getDataKey()
    const dt = indicator.getDataType()

    if (dt !== '*' && dt !== 'candle') {
      return
    }

    indicator.add(dk === '*' ? candle : candle.close)
  })

  const ivEntry = { candle }

  Object.keys(indicators).forEach(key => {
    ivEntry[key] = indicators[key].v()
  })

  iv.push(ivEntry)
})

debug('fed candles to all indicators')

FS.writeFileSync(OUTPUT_PATH, JSON.stringify(iv))

debug('wrote data to %s', OUTPUT_PATH)
debug('sample first data point follows')
debug(JSON.stringify(iv[0], null, 2))
