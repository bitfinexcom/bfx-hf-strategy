'use strict'

const PI = require('p-iteration')
const _isFunction = require('lodash/isFunction')
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
  const { plugins = [] } = state

  const pluginsToCall = plugins.filter(p => _isFunction(p.onPriceUpdate))

  await PI.forEach(pluginsToCall, async (plugin) => {
    await plugin.onPriceUpdate(state, update)
  })

  await withNoPosition(state, symbol, async () => {
    return exec(state.exec, state, update)
  })
}

module.exports = onPriceUpdate
