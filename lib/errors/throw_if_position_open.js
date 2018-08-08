'use strict'

const _isObject = require('lodash/isObject')

module.exports = (state = {}) => {
  const { position } = state

  if (_isObject(position)) {
    throw new Error('a position is open')
  }
}
