'use strict'

const PI = require('p-iteration')
const _isFunction = require('lodash/isFunction')

/**
 * @private
 *
 * @param {StrategyState} strategy - strategy state
 * @param {string} handlerName - name of plugin handler to execute
 * @param {...(string|number|Array|object|Function)} args - handler args
 * @returns {Promise} p
 */
const execPluginHandler = async (strategy = {}, handlerName, ...args) => {
  const { plugins = [] } = strategy

  return PI.forEach(plugins, async (plugin) => {
    if (_isFunction(plugin[handlerName])) {
      return plugin[handlerName](...args)
    }
  })
}

module.exports = execPluginHandler
