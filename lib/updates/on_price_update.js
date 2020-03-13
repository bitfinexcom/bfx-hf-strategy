'use strict'

const PI = require('p-iteration')
const _isFunction = require('lodash/isFunction')
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
 * onUpdate - called if a position is open
 *
 * Returns the resulting strategy state
 *
 * @memberOf module:UpdateHandlers
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {object} update - incoming price update
 * @returns {Promise} p - resolves to nextState
 */
const onPriceUpdate = async (state = {}, update = {}) => {
  const { symbol } = update
  const {
    onEnter = defaultHandler,
    onPriceUpdate = defaultHandler,
    onUpdateShort = defaultHandler,
    onUpdateLong = defaultHandler,
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

  await withPosition(nextState, symbol, async ({ amount }) => {
    nextState = amount > 0
      ? await onUpdateLong(nextState, update)
      : await onUpdateShort(nextState, update)
  })

  return onPriceUpdate(nextState, update)
}

module.exports = onPriceUpdate
