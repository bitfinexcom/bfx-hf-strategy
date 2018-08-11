'use strict'

const data = require('./lib/data')
const errors = require('./lib/errors')
const indicators = require('./lib/indicators')
const orders = require('./lib/orders')
const position = require('./lib/position')
const updates = require('./lib/updates')
const define = require('./lib/define')

module.exports = {
  define,

  ...data,
  ...errors,
  ...indicators,
  ...orders,
  ...position,
  ...updates,
}
