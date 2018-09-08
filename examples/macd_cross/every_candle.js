'use strict'

const HFS = require('../../')
const lookForTrade = require('./look_for_trade')
const whenLong = require('./when_long')
const whenShort = require('./when_short')

module.exports = async (state = {}, update = {}) => {
  const position = HFS.getPosition(state)

  if (!position) {
    return lookForTrade(state, update)
  }

  if (HFS.isLong(state)) {
    return whenLong(state, update)
  }

  if (HFS.isShort(state)) {
    return whenShort(state, update)
  }
}
