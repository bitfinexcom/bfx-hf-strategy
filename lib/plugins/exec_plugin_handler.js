'use strict'

const PI = require('p-iteration')
const _isFunction = require('lodash/isFunction')

// TODO: doc
const execPluginHandler = async (strategy = {}, handlerName, ...args) => {
  const { plugins = [] } = strategy

  return PI.forEach(plugins, async (plugin) => {
    if (_isFunction(plugin[handlerName])) {
      return plugin[handlerName](...args)
    }
  })
}

module.exports = execPluginHandler
