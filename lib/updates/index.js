'use strict'

const onCandle = require('./on_candle.js')
const onCandleUpdate = require('./on_candle_update.js')
const onPriceUpdate = require('./on_price_update.js')
const onSeedCandle = require('./on_seed_candle.js')
const onSeedCandleUpdate = require('./on_seed_candle_update.js')
const onSeedTrade = require('./on_seed_trade.js')
const onTrade = require('./on_trade.js')

/**
 * Strategy update handlers
 *
 * @module UpdateHandlers
 * @private
 */
module.exports = {
  onCandle,
  onCandleUpdate,
  onPriceUpdate,
  onSeedCandle,
  onSeedCandleUpdate,
  onSeedTrade,
  onTrade
}
