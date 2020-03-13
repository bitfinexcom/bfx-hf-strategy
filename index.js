'use strict'

const data = require('./lib/data')
const errors = require('./lib/errors')
const indicators = require('./lib/indicators')
const orders = require('./lib/orders')
const position = require('./lib/position')
const updates = require('./lib/updates')
const define = require('./lib/define')

require('./lib/types/position_parameters')
require('./lib/types/strategy_state')
require('./lib/types/strategy_trade')
require('./lib/types/candle')
require('./lib/types/trade')
require('./lib/types/order')

module.exports = {
  define,

  ...data,
  ...errors,
  ...indicators,
  ...orders,
  ...position,
  ...updates
}
