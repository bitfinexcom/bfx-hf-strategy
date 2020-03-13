## Bitfinex Honey Framework Trading Strategy Library for Node.JS

[![Build Status](https://travis-ci.org/bitfinexcom/bfx-hf-strategy.svg?branch=master)](https://travis-ci.org/bitfinexcom/bfx-hf-strategy)

This repo serves as a framework for creating trading bots/strategies on the Bitfinex platform. It consists of a set of order methods and an architecture compatible with `bfx-hf-data-server` and `bfx-hf-backtest` for backtests on historical candle/trade data, which can be transitioned seamlessly to trading on the live markets.

Strategies written using this framework must define a set of update methods, called on each tick (with either a trade or a candle), along with a set of indicators which are automatically updated on each tick. The indicators are made available to the strategy methods, and can be queried to direct trading behavior.

### Features
* Event-driven design approach allowing strategies to react to market updates in real-time
* Compatibility with `bfx-hf-backtest` for backtest execution
* Compatibility with `bfx-hf-strategy-exec` for execution on live markets

### Installation

```bash
npm i --save bfx-hf-strategy
```

### Quickstart & Example

Using `bfx-hf-stratey` implies writing a custom strategy utilizing the methods provided by the library. The following is an example of a valid strategy as defined within `examples/macd_cross`:

```js
const { MACD } = require('bfx-hf-indicators')
const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
const HFS = require('bfx-hf-strategy')

module.exports = ({
  symbol = SYMBOLS.BTC_USD,
  tf = TIME_FRAMES.ONE_HOUR
} = {}) => HFS.define({
  id: 'quickstart_example',
  name: 'quickstart_example',
  symbol,
  tf,

  indicators: {
    macd: new MACD([10, 26, 9])
  },

  // This quickstart example immediately opens a long position, and then no
  // longer reacts to future market updates
  onPriceUpdate: async (state = {}, update = {}) => {
    const position = HFS.getPosition(state)

    if (position) {
      return state
    }

    return HFS.openLongPositionMarket(state, {
      mtsCreate: mts,
      amount: 1,
      price
    })
  }
})
```

### Docs

Refer to [`/docs`](/docs) for JSDoc-generated HTML documentation, examples, and tutorials.

Ready to run examples can be found in the [`examples/` folder](/examples)

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
