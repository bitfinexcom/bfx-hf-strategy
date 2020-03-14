#### Overview

The [bfx-hf-backtest](https://github.com/bitfinexcom/bfx-hf-backtest) library provides logic for executing backtests both offline and online while connected to a [bfx-hf-data-server](https://github.com/bitfinexcom/bf-hf-data-server) instance for live data retrieval.

Offline backtests are performed via the [execOffline]{@link module:Backtest.execOffline} function. Data must be provided on a map key'ed by a candle market data identifier which can be generated via the `candleMarketDataKey({ symbol, tf })` helper. Data on the map is expected to be an array filled with `Candle` model instances, with `symbol` and `tf` data attached to each one.

For example:

```js
const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
const { execOffline } = require('bfx-hf-backtest')
const HFSData = require('bfx-hf-strategy-data')

const strategy = HFS.define({ … })
const candleKey = HFS.candleMarketDataKey({
  symbol: SYMBOLS.LEO_USD,
  tf: TIME_FRAMES.ONE_MINUTE
})

return execOffline(strategy, {
  candles: {
    [candleKey]: HFSData['trade:1m:tLEOUSD'].map(arr => ({
      ...new Candle(arr),
      symbol: SYMBOL,
      tf: TIME_FRAME
    }))
  }
})
```
