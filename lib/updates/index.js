'use strict'

const onSeedCandleUpdate = require('./on_seed_candle_update')
const onCandleUpdate = require('./on_candle_update')
const onPriceUpdate = require('./on_price_update')
const onSeedCandle = require('./on_seed_candle')
const onSeedTrade = require('./on_seed_trade')
const onCandle = require('./on_candle')
const onTrade = require('./on_trade')

module.exports = {
  onSeedCandleUpdate,
  onCandleUpdate,
  onPriceUpdate,
  onSeedCandle,
  onSeedTrade,
  onCandle,
  onTrade
}
