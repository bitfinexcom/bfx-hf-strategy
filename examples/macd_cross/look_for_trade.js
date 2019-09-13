'use strict'

const HFS = require('../../')

module.exports = async (state = {}, update = {}) => {
  const { price, mts } = update
  const { macd } = HFS.indicators(state)
  const current = macd.v()
  const previous = macd.prev()

  if (macd.l() < 2) {
    return state // await sufficient data
  }

  const crossedOver = (
    (current.macd >= current.signal) &&
    (previous.macd <= previous.signal)
  )

  if (crossedOver) {
    return HFS.openLongPositionMarket(state, {
      mtsCreate: mts,
      amount: 1,
      price
    })
  }

  const crossedUnder = (
    (current.macd <= current.signal) &&
    (previous.macd >= previous.signal)
  )

  if (crossedUnder) {
    return HFS.openShortPositionMarket(state, {
      mtsCreate: mts,
      amount: 1,
      price
    })
  }

  return state
}
