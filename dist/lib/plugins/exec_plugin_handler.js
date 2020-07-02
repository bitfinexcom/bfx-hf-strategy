'use strict';

const PI = require('p-iteration');

const _isFunction = require('lodash/isFunction');
/**
 * @private
 *
 * @param {StrategyState} strategy - strategy state
 * @param {string} handlerName - name of plugin handler to execute
 * @param {...(string|number|Array|object|Function)} args - handler args
 * @returns {Promise} p
 */


const execPluginHandler = (strategy = {}, handlerName, ...args) => {
  var _strategy$plugins, plugins;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _strategy$plugins = strategy.plugins, plugins = _strategy$plugins === void 0 ? [] : _strategy$plugins;
        return _context2.abrupt("return", PI.forEach(plugins, plugin => {
          return regeneratorRuntime.async(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!_isFunction(plugin[handlerName])) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", plugin[handlerName](...args));

              case 2:
              case "end":
                return _context.stop();
            }
          }, null, null, null, Promise);
        }));

      case 2:
      case "end":
        return _context2.stop();
    }
  }, null, null, null, Promise);
};

module.exports = execPluginHandler;