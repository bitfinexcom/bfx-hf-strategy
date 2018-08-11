'use strict'

const HFS = require('../../')

module.exports = async (state = {}, update = {}) => {
  const { price, mts } = update
  const { macd } = HFS.indicatorValues(state)

  if (macd.macd > macd.signal) {
    return HFS.closePositionMarket(state, { price, mtsCreate: mts })
  }

  return state
}
