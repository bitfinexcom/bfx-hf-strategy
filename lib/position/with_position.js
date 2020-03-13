'use strict'

const _isObject = require('lodash/isObject')
const getPosition = require('../data/get_position')

/**
 * Calls the provided async function with the position if it is open
 *
 * @param {object} state - strategy state
 * @param {string?} symbol - optional
 * @param {Function} func - async function to call if position is open
 * @return {Promise} p
 */
module.exports = async (state = {}, symbol, func = async () => {}) => {
  const position = getPosition(state, symbol)

  if (_isObject(position)) {
    return func(position)
  }
}
