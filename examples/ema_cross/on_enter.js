'use strict'

const _get = require('lodash/get')
const HFS = require('../../')

module.exports = async (state = {}, update = {}) => {
  const { price, mts } = update
  const i = HFS.indicators(state)
  const iv = HFS.indicatorValues(state)
  const emaS = _get(i, 'ema.s')
  const { l, s } = iv.ema || {}

  if (emaS.crossed(l)) {
    if (s > l) {
      return HFS.openLongPositionMarket(state, {
        mtsCreate: mts,
        amount: 1,
        price
      })
    } else {
      return HFS.openShortPositionMarket(state, {
        mtsCreate: mts,
        amount: 1,
        price
      })
    }
  }

  return state
}
