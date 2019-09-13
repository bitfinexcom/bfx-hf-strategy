## HF Trading Strategy Module

[![Build Status](https://travis-ci.org/bitfinexcom/bfx-hf-strategy.svg?branch=master)](https://travis-ci.org/bitfinexcom/bfx-hf-strategy)

This repo serves as a framework for creating trading bots/strategies on the Bitfinex platform. It consists of a set of order methods and an architecture compatible with `bfx-hf-data-server` and `bfx-hf-backtest` for backtests on historical candle/trade data, which can be transitioned seamlessly to trading on the live markets.

Strategies written using this framework must define a set of update methods, called on each tick (with either a trade or a candle), along with a set of indicators which are automatically updated on each tick. The indicators are made available to the strategy methods, and can be queried to direct trading behavior.

### Defining a Strategy

The `define` method is provided to construct a trading strategy from a set of indicators & update methods. Strategies created with it can be used with `bfx-hf-backtest` or with the `exec` method to run on the live market. An example strategy follows below:

```js
const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
const { EMA } = require('bfx-hf-indicators')

HFS.define({
  id: 'ema_cross',
  name: 'ema_cross',
  symbol: SYMBOLS.BTC_USD,
  tf: TIME_FRAMES.ONE_MINUTE,

  indicators: {
    emaL: new EMA([100]),
    emaS: new EMA([20])
  },

  onEnter: require('./on_enter'),
  onUpdateLong: require('./on_update_long'),
  onUpdateShort: require('./on_update_short')
})
```

The above strategy defines two EMA indicators, `emaL` and `emaS`, with periods of 100 and 20 respectively, and 3 update methods; In total, 5 update methods are available:

* `onEnter` - called when no position is open
* `onUpdateLong` - called when a long position is open
* `onUpdateShort` - called when a short position is open
* `onUpdate` - called when any position is open
* `onPriceUpdate` - called on every tick

### Update Handlers

All update handlers must be asynchronous, and receive the same arguments of `(state = {}, update = {})`. The update has the following fields:

* `type` - 'candle' or 'trade', indicating which fields are available
* `mts` - timestamp, in ms
* `price` - candle or trade price (depends on `candlePrice` strategy setting)
* for candles, `open`, `high`, `low`, `close`, and `vol` are provided

Update handlers must return the next state object after performing any actions, or the current state object if no modifications were made.

The `state` object can be queried for historical candle data, indicators & indicator values, open positions, and previous strategy trades. Various helpers are provided to query this data; for an example, see the EMA cross example `onEnter` handler below:

```js
const _get = require('lodash/get')
const HFS = require('bfx-hf-strategy')

module.exports = async (state = {}, update = {}) => {
  const { price, mts } = update
  const i = HFS.indicators(state)
  const iv = HFS.indicatorValues(state)
  const { emaS } = i // full indicator object
  const l = iv.emaL
  const s = iv.emaS

  // Note that the default strategy symbol is used if no symbol is specified
  if (emaS.crossed(l)) {
    if (s > l) {
      return HFS.openLongPositionMarket(state, {
        mtsCreate: mts,
        amount: 1,
        price
      })
    } else {
      return HFS.openShortPositionMarket(state, {
        mtsCreate: mts,
        amount: 1,
        price
      })
    }
  }

  return state
}
```

### Managing Positions

Within the update handlers, several async helpers are available to open/update/close positions:

* `openLongPositionMarket(state, args = {})`
* `openLongPositionLimit(state, args = {})`
* `openLongPosition(state, args = {})`
* `openShortPositionMarket(state, args = {})`
* `openShortPositionLimit(state, args = {})`
* `openShortPosition(state, args = {})`
* `openPosition(state, args = {})`
* `updateLongPositionMarket(state, args = {})`
* `updateLongPositionLimit(state, args = {})`
* `updateLongPosition(state, args = {})`
* `updateShortPositionMarket(state, args = {})`
* `updateShortPositionLimit(state, args = {})`
* `updateShortPosition(state, args = {})`
* `updatePosition(state, args = {})`
* `closePositionMarket(state, args = {})`
* `closePositionLimit(state, args = {})`
* `closePosition(state, args = {})`

The `price` and `mtsCreate` timestamp must both be provided to all update handlers, even those operating with MARKET orders, in order to record the price and timestamp during backtests. If these are not provided, backtests run via `bfx-hf-backtest` will fail.

### Executing on Live Markets

To run a strategy on the live marketplace, refer to the [bfx-hf-strategy-exec](https://github.com/bitfinexcom/bfx-hf-strategy-exec) documentation.
