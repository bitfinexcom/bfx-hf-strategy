'use strict'

const { execInterruptableHandler: exec } = require('../util')
const { execPluginHandler } = require('../plugins')

/**
 * Passes the incoming price update to the relevant strategy lifecycle methods.
 *
 * @memberof module:UpdateHandlers
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {object} update - incoming price update
 * @returns {Promise} p
 */
const onPriceUpdate = async (state = {}, update = {}) => {
  await execPluginHandler(state, 'onPriceUpdate', state, update)
  return exec(state.exec, state, update)
}

module.exports = onPriceUpdate
