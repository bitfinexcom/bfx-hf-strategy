#### Overview

Orders are submitted through the official [bitfinex-api-node](https://github.com/bitfinexcom/bitfinex-api-node) Bitfinex Node.JS library, and as such can be defined using the `Order` model included with [bfx-api-node-mode ](https://github.com/bitfinexcom/bfx-api-node-models). This removes the need to construct a new order packet for the WSv2 API, and validates parameters automatically.

Order types are available on the `Order.type` map:

* `Order.type.LIMIT`
* `Order.type.MARKET`
* `Order.type.STOP`
* `Order.type.STOP_LIMIT`
* `Order.type.TRAILING_STOP`
* `Order.type.FOK` - fill or kill
* `Order.type.IOC` - immediate or cancel

The types above all trade on margin; for their exchange counterparts prefix the type with `EXCHANGE_`, as in `Order.type.EXCHANGE_LIMIT`.

#### Symbols

Symbols must be prefixed with `t` (i.e. `'tLEOUSD'`) for standard markets and `f` (i.e. `'fUSD'`) for funding markets. To help prevent errors, all symbols are available on the [bfx-hf-util](https://github.com/bitfinexcom/bfx-hf-util) utility library under the `SYMBOLS` export, with base and quote currencies seperated by an underscore. For example, `'tLEUSD'` becomes `SYMBOLS.LEO_USD`.

#### Creating an Order

To create a new order, use the `Order` constructor and pass the required parameters:

```js
const { Order } = require('bfx-ap-node-models')
const { SYMBOLS } = require('bfx-hf-util')

const o = new Order({
  type: Order.type.STOP_LIMIT, // margin order
  symbol: SYMBOLS.LEO_USD,
  price: 0.75, // price is converted to a decimal string automatically
  priceAuxLimit: 0.82, // stop price
  amount: 6,
  hidden: true,   // makes the order invisible to other users
  postonly: true  // ensure the order is inserted into the book
})
```

#### Submitting an Order

The order created above can be passed to any one of the position manipulation helper methods, listed below:

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

All of the methods listed above return promises, which resolve on order confirmation. Taken together, within a strategy this might look like:

```js
const HFS = require('bfx-hf-strategy')
const { SYMBOLS } = require('bfx-hf-util')

const strategy = HFS.define({
  // ...
  exec: async function () {
    // strategy logic...

    // Submit an order via a position method. Making this call twice in a row
    // will result in an error, as the openPosition() helper fails if a position
    // is already open.
    await this.openPosition(new Order({
      type: Order.type.STOP_LIMIT, // margin order
      symbol: SYMBOLS.LEO_USD,
      price: 0.75, // price is converted to a decimal string automatically
      priceAuxLimit: 0.82, // stop price
      amount: 6,
      hidden: true,   // makes the order invisible to other users
      postonly: true  // ensure the order is inserted into the book
    }))

    // At this point the order has been confirmed. One may save the returned
    // promise and continue execution immediately to prevent delays in logic
    // processing, but it is recommended to listen for a resolve/reject in order
    // to handle rejected Orders.
  }
})
```

#### Alternative Parameter Formats

The methods listed above all take either an `Order` model instance, a Bitfinex WSv2 array-format order, or a plain JS object holding parameters which are then passed to a new `Order` instance internally.
