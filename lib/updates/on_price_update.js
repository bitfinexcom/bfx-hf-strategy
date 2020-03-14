'use strict'

const PI = require('p-iteration')
const _isFunction = require('lodash/isFunction')
const withPosition = require('../position/with_position')
const withNoPosition = require('../position/with_no_position')
const { execInterruptableHandler: exec } = require('../util')

/**
 * Passes the incoming price update to the relevant strategy lifecycle methods.
 *
 * @memberOf module:UpdateHandlers
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {object} update - incoming price update
 * @returns {Promise} p
 */
const onPriceUpdate = async (state = {}, update = {}) => {
  const { symbol } = update
  const {
    onEnter, onPriceUpdate, onUpdateShort, onUpdateLong, onUpdate, plugins = []
  } = state

  const pluginsToCall = plugins.filter(p => _isFunction(p.onPriceUpdate))

  await PI.forEach(pluginsToCall, async (plugin) => {
    await plugin.onPriceUpdate(state, update)
  })

  if (_isFunction(onEnter)) {
    await withNoPosition(state, symbol, async () => {
      return exec(onEnter, state, update)
    })
  }

  if (_isFunction(onUpdate)) {
    await withPosition(state, symbol, async () => {
      return exec(onUpdate, state, update)
    })
  }

  if (_isFunction(onUpdateLong) || _isFunction(onUpdateShort)) {
    await withPosition(state, symbol, async ({ amount }) => {
      return amount > 0
        ? _isFunction(onUpdateLong) && exec(onUpdateLong, state, update)
        : _isFunction(onUpdateShort) && exec(onUpdateShort, state, update)
    })
  }

  if (_isFunction(onPriceUpdate)) {
    await exec(onPriceUpdate, state, update)
  }
}

module.exports = onPriceUpdate
