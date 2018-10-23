'use strict'

const HFS = require('../../')

module.exports = async (state = {}, update = {}) => {
  const { price, mts } = update
  const iv = HFS.indicatorValues(state)
  const l = iv.emaL
  const s = iv.emaS

  if (s < l) {
    return HFS.closePositionMarket(state, { price, mtsCreate: mts })
  }

  return state
}
