'use strict'

const { EMA } = require('bfx-hf-indicators')
const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
const onEnter = require('./on_enter')
const onUpdateLong = require('./on_update_long')
const onUpdateShort = require('./on_update_short')
const getUIDef = require('./get_ui_def')
const HFS = require('../../')

module.exports = ({
  emaLPeriod = 100,
  emaSPeriod = 20,
  symbol = SYMBOLS.BTC_USD,
  tf = TIME_FRAMES.ONE_HOUR
} = {}) => HFS.define({
  id: 'ema_cross',
  name: 'ema_cross',
  symbol,
  tf,

  indicators: {
    emaL: new EMA([emaLPeriod]),
    emaS: new EMA([emaSPeriod])
  },

  getUIDef,
  onEnter,
  onUpdateLong,
  onUpdateShort
})
