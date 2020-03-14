#### Defining a Strategy

The `define` method is provided to construct a trading strategy from a set of
indicators & update methods. Strategies created with it can be used with
`bfx-hf-backtest` or `bfx-hf-strategy-exec` to run on the live markets. An
example strategy follows below:

```js
const { EMA } = require('bfx-hf-indicators')
const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
const HFS = require('bfx-hf-strategy')

const strategy = HFS.define({
  id: 'ema_cross',
  name: 'ema_cross',
  symbol: SYMBOLS.LEO_USD,    // default symbol
  tf: TIME_FRAMES.ONE_MINUTE, // default time frame

  // Assumes LEO balance > 1 and trading w/ affiliate code
  takerFee: (0.0002 * 0.95) * 0.85,
  makerFee: (0.0001 * 0.95) * 0.85,

  simulateLiveCandleEnabled: false, // keeps results deterministic

  indicators: { // indicator definition, automatically updated on each tick
    l: new EMA([100]),
    s: new EMA([20])
  },

  exec: async function () { // called on each trade/candle data point
    const { s, l } = this.indicatorValues()

    // Breaks execution at this location, on this tick, if the short and long
    // EMA indicators have not yet crossed.
    await this.condition.indicatorsCrossed('s', 'l')

    // Open a position with a market order if no position is open; otherwise
    // close the open position with a market order.
    if (!this.inAPosition()) {
      return this.openPositionMarket({ amount: s > l ? 6 : -6 })
    } else {
      return this.closePositionMarket()
    }
  }
})
```

The above strategy defines two EMA indicators, `l` and `s`, with periods of 100
and 20 respectively, and an `exec` method that holds the strategy logic. Within
`exec` a **condition** is defined which breaks execution at that point in the
function if the two indicators, `s` and `l` (short and long EMAs respectively)
have not crossed values. For a full list of possible conditions, refer to the
{@link module:Helpers} documentation.

If the indicators have crossed values on this tick, execution continues to the
position check, at which point either a new position is opened with an order size
of `6` LEO, or a previously opened position is closed. In either case a MARKET
order is used.

#### Managing Positions

Within the `exec` function, several async helpers are available to
open/update/close positions:

* [openLongPositionMarket(params = {})]{@link module:Helpers.h.openLongPositionMarket}
* [openLongPositionLimit(params = {})]{@link module:Helpers.h.openLongPositionLimit}
* [openLongPosition(params = {})]{@link module:Helpers.h.openLongPosition}
* [openShortPositionMarket(params = {})]{@link module:Helpers.h.openShortPositionMarket}
* [openShortPositionLimit(params = {})]{@link module:Helpers.h.openShortPositionLimit}
* [openShortPosition(params = {})]{@link module:Helpers.h.openShortPosition}
* [openPosition(params = {})]{@link module:Helpers.h.openPosition}
* [updateLongPositionMarket(params = {})]{@link module:Helpers.h.updateLongPositionMarket}
* [updateLongPositionLimit(params = {})]{@link module:Helpers.h.updateLongPositionLimit}
* [updateLongPosition(params = {})]{@link module:Helpers.h.updateLongPosition}
* [updateShortPositionMarket(params = {})]{@link module:Helpers.h.updateShortPositionMarket}
* [updateShortPositionLimit(params = {})]{@link module:Helpers.h.updateShortPositionLimit}
* [updateShortPosition(params = {})]{@link module:Helpers.h.updateShortPosition}
* [updatePosition(params = {})]{@link module:Helpers.h.updatePosition}
* [closePositionMarket(params = {})]{@link module:Helpers.h.closePositionMarket}
* [closePositionLimit(params = {})]{@link module:Helpers.h.closePositionLimit}
* [closePosition(params = {})]{@link module:Helpers.h.closePosition}

The `price` and `mtsCreate` order timestamp are automatically passed to the
created order (`price` is needed for MARKET orders if backtesting) based on the
last received data for the strategy's symbol.

#### Executing on Live Markets

To run a strategy on the live marketplace, refer to the {@tutorial Live Execution} tutorial.
