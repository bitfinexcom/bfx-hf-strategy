'use strict'

const _isObject = require('lodash/isObject')

module.exports = (state = {}, message) => {
  const { position } = state

  if (_isObject(position)) {
    throw new Error(message)
  }
}
