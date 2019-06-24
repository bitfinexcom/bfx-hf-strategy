'use strict'

const FS = require('fs')
const { Candle } = require('bfx-api-node-models')
const HFI = require('bfx-hf-indicators')
const rawCandleData = require('./btc_candle_data.json')

const candles = rawCandleData
  .sort((a, b) => a[0] - b[0])
  .map(c => new Candle(c).toJS())
  .map(c => ({ ...c, vol: c.volume }))

const iv = []
const indicators = {}

Object.keys(HFI).forEach(iName => {
  if (iName === 'Indicator') return

  const C = HFI[iName]
  const args = C.args.map(argDef => argDef.default)
  const key = C.id

  indicators[key] = new C(args)
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

FS.writeFileSync(`${__dirname}/candle_iv_data.json`, JSON.stringify(iv))
