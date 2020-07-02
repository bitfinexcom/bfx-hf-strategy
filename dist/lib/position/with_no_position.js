'use strict';

const _isObject = require('lodash/isObject');

const getPosition = require('../data/get_position');
/**
 * Calls the provided async function if no position is open for the symbol
 *
 * @param {StrategyState} state - strategy state
 * @param {string} [symbol] - symbol
 * @param {Function} func - async function to call if no position is open
 * @returns {Promise} p
 */


module.exports = (state = {}, symbol, func = () => {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
}) => {
  var position;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        position = getPosition(state, symbol);

        if (_isObject(position)) {
          _context2.next = 3;
          break;
        }

        return _context2.abrupt("return", func());

      case 3:
      case "end":
        return _context2.stop();
    }
  }, null, null, null, Promise);
};