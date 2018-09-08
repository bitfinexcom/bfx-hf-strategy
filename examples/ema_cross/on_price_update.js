'use strict'

const _isObject = require('lodash/isObject')
const HFS = require('../../')

const onEnter = require('./on_enter')
const onUpdateLong = require('./on_update_long')
const onUpdateShort = require('./on_update_short')

module.exports = async (state = {}, update = {}) => {
  if (HFS.getNumCandles(state) < 2) { // 2 price points needed
    return state
  }

  const pos = HFS.getPosition(state)

  if (!_isObject(pos)) {
    return onEnter(state, update)
  } else if (HFS.isLong(state)) {
    return onUpdateLong(state, update)
  } else if (HFS.isShort(state)) {
    return onUpdateShort(state, update)
  }
}
