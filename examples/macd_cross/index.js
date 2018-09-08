'use strict'

const { MACD } = require('bfx-hf-indicators')
const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
const HFS = require('../../')

module.exports = ({
  symbol = SYMBOLS.BTC_USD,
  tf = TIME_FRAMES.ONE_HOUR
} = {}) => HFS.define({
  id: 'macd_cross',
  name: 'macd_cross',
  symbol,
  tf,

  indicators: {
    macd: new MACD([10, 26, 9])
  },

  onPriceUpdate: require('./every_candle')
})
