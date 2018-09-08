'use strict'

const { EMA } = require('bfx-hf-indicators')
const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
const HFS = require('../../')

module.exports = ({
  symbol = SYMBOLS.BTC_USD,
  tf = TIME_FRAMES.ONE_HOUR
} = {}) => HFS.define({
  id: 'ema_cross',
  name: 'ema_cross',
  symbol,
  tf,

  indicators: {
    ema: {
      l: new EMA([100]),
      s: new EMA([20])
    }
  },

  onEnter: require('./on_enter'),
  onUpdateLong: require('./on_update_long'),
  onUpdateShort: require('./on_update_short')
})
