'use strict'

const PI = require('p-iteration')
const _isFinite = require('lodash/isFinite')
const _isFunction = require('lodash/isFunction')
const closePositionMarket = require('../position/close_position_market')
const withPosition = require('../position/with_position')
const withNoPosition = require('../position/with_no_position')

const defaultHandler = s => s

/**
 * Passes the incoming price update to the relevant strategy lifecycle methods:
 *
 * onPriceUpdate - always called
 * onEnter - called if no position is open
 * onUpdateShort - called if a short position is open
 * onUpdateLong - called if a long position is open
 * onUpdateClosing - called if a position is open but currently closing
 * onUpdate - called if a position is open
 *
 * Returns the resulting strategy state
 *
 * @param {object} state - strategy state
 * @param {object} update - incoming price update
 * @return {Promise} p - resolves to nextState
 */
const onPriceUpdate = async (state = {}, update = {}) => {
  const { symbol } = update
  const {
    onEnter = defaultHandler,
    onPriceUpdate = defaultHandler,
    onUpdateShort = defaultHandler,
    onUpdateLong = defaultHandler,
    onUpdateClosing = defaultHandler,
    onUpdate = defaultHandler,
    plugins
  } = state

  let nextState = state
  const pluginsToCall = plugins.filter(p => _isFunction(p.onPriceUpdate))

  await PI.forEach(pluginsToCall, async (plugin) => {
    state = await plugin.onPriceUpdate(state, update)
  })

  if (_isFunction(onEnter)) {
    await withNoPosition(nextState, symbol, async () => {
      nextState = await onEnter(nextState, update)
    })
  }

  if (_isFunction(onUpdate)) {
    await withPosition(nextState, symbol, async () => {
      nextState = await onUpdate(nextState, update)
    })
  }

  await withPosition(nextState, symbol, async ({ amount, closing }) => {
    if (closing && _isFunction(onUpdateClosing)) {
      nextState = await onUpdateClosing(nextState, update)
    } else {
      nextState = amount > 0
        ? await onUpdateLong(nextState, update)
        : await onUpdateShort(nextState, update)
    }
  })

  return onPriceUpdate(nextState, update)
}

module.exports = onPriceUpdate
