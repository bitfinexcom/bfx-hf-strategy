'use strict'

const HFS = require('../../')

module.exports = async (state = {}, update = {}) => {
  const { price, mts } = update
  const iv = HFS.indicatorValues(state)
  const { l, s } = iv.ema || {}

  if (s < l) {
    return HFS.closePositionMarket(state, { price, mtsCreate: mts })
  }

  return state
}
