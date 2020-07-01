## Modules

<dl>
<dt><a href="#module_bfx-hf-strategy">bfx-hf-strategy</a></dt>
<dd><p>This module serves as a framework for creating trading bots/strategies on
the Bitfinex platform. It consists of a set of order methods and an
architecture compatible with <a href="https://github.com/bitfinexcom/bfx-hf-data-server">bfx-hf-data-server</a> and
<a href="https://github.com/bitfinexcom/bfx-hf-backtest">bfx-hf-backtest</a> for backtests on historical candle/trade
data, which can be transitioned seamlessly to trading on the live markets.</p>
<p>Strategies written using this framework must define an <code>exec</code> function which
in turn is provided an instance of the
<a href="#module_bfx-hf-strategy/RuntimeHelpers">RuntimeHelpers</a> object bound to
that strategy during execution. The helpers can be used to control the
execution flow of the strategy, inspect data &amp; indicators, and make
automated trading decisions.</p>
<p>See <a href="#module_bfx-hf-strategy/RuntimeHelpers">RuntimeHelpers</a> for a full
list of methods available to the strategy <code>exec</code> function.</p>
</dd>
<dt><a href="#module_bfx-hf-strategy/RuntimeHelpers">bfx-hf-strategy/RuntimeHelpers</a></dt>
<dd><p>A set of utility functions bound to the strategy they are used in, providing
control over strategy execution, access to data, and order manipulation
methods.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#ErrorInterruptExec">ErrorInterruptExec</a> ⇐ <code>Error</code></dt>
<dd><p>Error meant to be caught safely when thrown, in order to interrupt flow</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#addCandleData">addCandleData(state, candle)</a></dt>
<dd><p>Updates the candle dataset in-place with a new candle</p>
</dd>
<dt><a href="#addTradeData">addTradeData(state, trade)</a> ⇒ <code><a href="#StrategyState">StrategyState</a></code></dt>
<dd><p>Updates the trade dataset in-place with a new trade.</p>
</dd>
<dt><a href="#candleMarketDataKey">candleMarketDataKey(candle)</a> ⇒ <code>string</code></dt>
<dd><p>Generates key for candle market data on strategy state</p>
</dd>
<dt><a href="#getCandle">getCandle(state, n, symbol, tf)</a> ⇒ <code>bfx-api-node-models.Candle</code></dt>
<dd><p>Reverses candle sort, n = 0 for most recent candle</p>
</dd>
<dt><a href="#getCandles">getCandles(state, forSymbol, forTF)</a> ⇒ <code>Array.&lt;Candle&gt;</code></dt>
<dd><p>Returns the candle dataset for the specified symbol/timeframe pair</p>
</dd>
<dt><a href="#getDefaultCandles">getDefaultCandles(state)</a> ⇒ <code>Array.&lt;Candle&gt;</code></dt>
<dd><p>Returns the candle dataset for the default symbol/tf pair</p>
</dd>
<dt><a href="#getDefaultSymbol">getDefaultSymbol(state)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the default symbol for the strategy; a strategy can have either a
set of multiple symbols, a single default &#39;symbol&#39; defined, or both.</p>
</dd>
<dt><a href="#getDefaultTF">getDefaultTF(state)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the default time frame for the strategy; a strategy can have either a
set of multiple time frames, a single default time frame, or both.</p>
</dd>
<dt><a href="#getDefaultTrades">getDefaultTrades(state)</a> ⇒ <code>Array.&lt;object&gt;</code></dt>
<dd><p>Returns the trade dataset for the default symbol</p>
</dd>
<dt><a href="#getFees">getFees(state)</a> ⇒ <code>object</code></dt>
<dd><p>Extracts fee data from strategy state</p>
</dd>
<dt><a href="#getIndicator">getIndicator(state, id)</a> ⇒ <code>Indicator</code></dt>
<dd><p>Returns an indicator by ID</p>
</dd>
<dt><a href="#getIndicators">getIndicators(state)</a> ⇒ <code>object</code></dt>
<dd><p>Returns the indicator map for the strategy</p>
</dd>
<dt><a href="#getLastPrice">getLastPrice(state, [forSymbol], [forTF])</a> ⇒ <code>object</code></dt>
<dd><p>Get the last price &amp; timestamp received for the specified symbol &amp; tf.</p>
</dd>
<dt><a href="#getNumCandles">getNumCandles(state, symbol, tf)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the number of received candles for the specified symbol/timeframe
pair</p>
</dd>
<dt><a href="#getNumTrades">getNumTrades(state, symbol)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the number of received trades for the specified symbol/timeframe
pair.</p>
</dd>
<dt><a href="#getPosition">getPosition(state, [forSymbol])</a> ⇒ <code>Position</code></dt>
<dd><p>Returns the position for the specified symbol</p>
</dd>
<dt><a href="#getStrategyTrades">getStrategyTrades(state)</a> ⇒ <code><a href="#StrategyTrade">Array.&lt;StrategyTrade&gt;</a></code></dt>
<dd><p>Returns an array of trades executed by the strategy</p>
</dd>
<dt><a href="#getTrade">getTrade(state, n, symbol)</a> ⇒ <code>bfx-api-node-models.PublicTrade</code></dt>
<dd><p>Returns the trade for the specified market at the specified index. Reverses
trade sort, set n = 0 for most recent trade.</p>
</dd>
<dt><a href="#getTrades">getTrades(state, [symbol])</a> ⇒ <code>Array.&lt;Trade&gt;</code></dt>
<dd><p>Returns all known trades for the specified symbol</p>
</dd>
<dt><a href="#isLong">isLong(state, [forSymbol])</a> ⇒ <code>boolean</code></dt>
<dd><p>Queries if a long position is open for the specified symbol</p>
</dd>
<dt><a href="#isShort">isShort(state, [forSymbol])</a> ⇒ <code>boolean</code></dt>
<dd><p>Queries if a short position is open for the specified symbol</p>
</dd>
<dt><a href="#positionPL">positionPL(position, [closePrice])</a> ⇒ <code>number</code></dt>
<dd><p>Returns the P/L figure for the specified position, taking into account all
trades &amp; a close with the provided price (optional)</p>
</dd>
<dt><a href="#tradeMarketDataKey">tradeMarketDataKey(trade)</a> ⇒ <code>string</code></dt>
<dd><p>Generates key for trade market data on strategy state</p>
</dd>
<dt><a href="#updatePositionWithTrade">updatePositionWithTrade(position, trade)</a></dt>
<dd><p>Adds the trade to the position state</p>
</dd>
<dt><a href="#logTrades">logTrades(strategy)</a></dt>
<dd><p>Prints strategy execution information to the console</p>
</dd>
<dt><a href="#defineStrategy">defineStrategy(args)</a> ⇒ <code><a href="#StrategyState">StrategyState</a></code></dt>
<dd><p>Returns an initial strategy state object for the provided arguments. The
state object can then be used with the various HF strategy methods.</p>
</dd>
<dt><a href="#safeThrow">safeThrow(state, error)</a></dt>
<dd><p>Throws the error if backtesting, logs it otherwise.</p>
</dd>
<dt><a href="#throwsIfOrderClosesPosition">throwsIfOrderClosesPosition(state, order)</a></dt>
<dd></dd>
<dt><a href="#addIndicatorData">addIndicatorData(state, type, update)</a></dt>
<dd><p>Adds the provided data update packet to all strategy indicators matching the
update type.</p>
</dd>
<dt><a href="#findIndicator">findIndicator(state, f)</a> ⇒ <code>Indicator</code></dt>
<dd><p>Returns the first indicator in the strategy for which the provided function
evaluates to true.</p>
</dd>
<dt><a href="#forEachIndicator">forEachIndicator(state, f)</a></dt>
<dd><p>Calls the provided function with each indicator on the strategy.</p>
</dd>
<dt><a href="#indicatorValues">indicatorValues(state)</a> ⇒ <code>object</code></dt>
<dd><p>Returns a map of all indicator values for the provided strategy</p>
</dd>
<dt><a href="#indicatorsExec">indicatorsExec(state, fn)</a> ⇒ <code>object</code></dt>
<dd><p>Executes the specified function in all strategy indicators, and returns the
results in a map matching the indicator map structure.</p>
</dd>
<dt><a href="#indicatorsReady">indicatorsReady(state)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if all indicators have been marked as ready (seed period fulfilled)</p>
</dd>
<dt><a href="#indicators">indicators(state)</a> ⇒ <code>object</code></dt>
<dd><p>Strategy indicators selector</p>
</dd>
<dt><a href="#resetIndicators">resetIndicators(state)</a></dt>
<dd><p>Resets all of the strategy&#39;s indicators</p>
</dd>
<dt><a href="#seedPeriodForIndicators">seedPeriodForIndicators(state)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the minimum seed period required for the strategy</p>
</dd>
<dt><a href="#updateIndicatorData">updateIndicatorData(state, type, update)</a></dt>
<dd><p>Updates the most recent data point for all suitable indicators</p>
</dd>
<dt><a href="#simulateOrderFill">simulateOrderFill(orderParams, [fillAmount])</a> ⇒ <code>bfx-api-node-models.Order</code></dt>
<dd><p>Simulates a fill for backtests, replaces submitOrder()</p>
</dd>
<dt><a href="#submitOrder">submitOrder(state, order)</a> ⇒ <code>Promise</code></dt>
<dd><p>Submit an order using either a Bitfinex array-format order, order model
instance, or a raw order parameters object.</p>
</dd>
<dt><a href="#submitTrade">submitTrade(state, orderParams)</a> ⇒ <code>object</code></dt>
<dd><p>Creates &amp; submits the order, and returns the generated DB trade</p>
</dd>
<dt><a href="#validateOrderParams">validateOrderParams(state, orderParams)</a></dt>
<dd><p>Ensures the provided parameters contain an amount, valid type, and valid
symbol</p>
</dd>
<dt><a href="#closeOpenPositions">closeOpenPositions(state)</a> ⇒ <code>Promise</code></dt>
<dd><p>Closes all open positions with market orders</p>
</dd>
<dt><a href="#closePositionLimit">closePositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Closes a position with a limit order</p>
</dd>
<dt><a href="#closePositionMarket">closePositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Closes a position with a market order</p>
</dd>
<dt><a href="#closePositionWithOrder">closePositionWithOrder(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Closes an open position with an order. Throws an error if no position is open
for the order&#39;s symbol.</p>
</dd>
<dt><a href="#closePosition">closePosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Closes an open position with an order. Throws an error if no position is
open for the order&#39;s symbol.</p>
</dd>
<dt><a href="#createPositionObject">createPositionObject(state, args)</a> ⇒ <code><a href="#StrategyPosition">StrategyPosition</a></code></dt>
<dd><p>Creates a new/fresh position object, as used by the internal strategy state</p>
</dd>
<dt><a href="#openLongPositionLimit">openLongPositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a new long position with a limit order</p>
</dd>
<dt><a href="#openLongPositionMarket">openLongPositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a new long position with a market order</p>
</dd>
<dt><a href="#openLongPosition">openLongPosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Alias for openPositon</p>
</dd>
<dt><a href="#openPositionLimit">openPositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a new position with a limit order</p>
</dd>
<dt><a href="#openPositionMarket">openPositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a new position with a market order. Pulls order timestamp and price
from last received data for the order&#39;s symbol.</p>
</dd>
<dt><a href="#openPositionWithOrder">openPositionWithOrder(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Submits a new order via ws2 with the supplied parameters, creates a new
strategy trade and creates a position.</p>
<p>If no ws client is available, no data is saved &amp; no order is dispatched</p>
</dd>
<dt><a href="#openPosition">openPosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a position with a new order; resolves to an error if a position is
already open.</p>
</dd>
<dt><a href="#openShortPositionLimit">openShortPositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a short position (negates passed amount)</p>
</dd>
<dt><a href="#openShortPositionMarket">openShortPositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a short position (negates passed amount)</p>
</dd>
<dt><a href="#openShortPosition">openShortPosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a short position (negates passed amount)</p>
</dd>
<dt><a href="#positionPL">positionPL(state, [_symbol], [closePrice])</a> ⇒ <code>number</code></dt>
<dd><p>Returns the P/L figure for the specified position, taking into account all
trades and optionally a close with the provided price.</p>
</dd>
<dt><a href="#updateLongPositionLimit">updateLongPositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a long position with a limit order</p>
</dd>
<dt><a href="#updateLongPositionMarket">updateLongPositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a long position with a market order</p>
</dd>
<dt><a href="#updateLongPosition">updateLongPosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a long position with an order.</p>
</dd>
<dt><a href="#updatePositionLimit">updatePositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a position with a limit order</p>
</dd>
<dt><a href="#updatePositionMarket">updatePositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a new position with a market order. Pulls order timestamp and price
from last received data for the order&#39;s symbol.</p>
</dd>
<dt><a href="#updatePositionWithOrder">updatePositionWithOrder(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Submits a new order via ws2 with the supplied parameters, creates a new
strategy trade and updates the current position.</p>
<p>If no ws client is available, no data is saved &amp; no order is dispatched</p>
</dd>
<dt><a href="#updatePosition">updatePosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Alias for updatePositionWithOrder</p>
</dd>
<dt><a href="#updateShortPositionLimit">updateShortPositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a short position (negates passed amount)</p>
</dd>
<dt><a href="#updateShortPositionMarket">updateShortPositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a short position (negates passed amount)</p>
</dd>
<dt><a href="#updateShortPosition">updateShortPosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a short position (negates passed amount)</p>
</dd>
<dt><a href="#onCandleUpdate">onCandleUpdate(state, candle)</a> ⇒ <code>Promise</code></dt>
<dd><p>Called for an incoming candle update, for a candle previously passed to
onCandle() (same candle, new prices). Propagates the candle via onPriceUpdate</p>
</dd>
<dt><a href="#onCandle">onCandle(state, candle)</a> ⇒ <code>Promise</code></dt>
<dd><p>Called for an incoming (new) candle. Propagates the candle via onPriceUpdate</p>
</dd>
<dt><a href="#onPriceUpdate">onPriceUpdate(state, update)</a> ⇒ <code>Promise</code></dt>
<dd><p>Passes the incoming price update to the relevant strategy lifecycle methods.</p>
</dd>
<dt><a href="#onSeedCandleUpdate">onSeedCandleUpdate(state, candle)</a></dt>
<dd><p>Called for an incoming seed-period candle update, for a candle previously
passed to onSeedCandle() (same candle, new prices)</p>
</dd>
<dt><a href="#onSeedCandle">onSeedCandle(state, candle)</a> ⇒ <code>Promise</code></dt>
<dd><p>Called for an incoming (new) seed-period candle</p>
</dd>
<dt><a href="#onSeedTrade">onSeedTrade(state, trade)</a></dt>
<dd><p>Called for incoming seed-period trades.</p>
</dd>
<dt><a href="#onTrade">onTrade(state, trade)</a> ⇒ <code>Promise</code></dt>
<dd><p>Called for an incoming (new) trade. Propagates the trade via onPriceUpdate</p>
</dd>
<dt><a href="#execInterruptableHandler">execInterruptableHandler(handler, ...args)</a></dt>
<dd><p>Executes the provided handler while safely catching any ErrorInterruptExec
errors. Allows for interrupting handler execution early. Syntactical sugar.</p>
</dd>
<dt><a href="#validateStrategy">validateStrategy(state)</a></dt>
<dd><p>Validate a strategy instance</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#OrderParameters">OrderParameters</a> : <code>object</code></dt>
<dd><p>Parameters defining an atomic order</p>
</dd>
<dt><a href="#PositionParameters">PositionParameters</a></dt>
<dd><p>Parameters used to create a new position</p>
</dd>
<dt><a href="#StrategyDefinition">StrategyDefinition</a> : <code>object</code></dt>
<dd><p>A set of parameters defining a trading strategy. Can be passed to
<a href="#defineStrategy">defineStrategy</a> to obtain a <a href="#StrategyState">StrategyState</a> object which can
then be used with either <a href="https://github.com/bitfinexcom/bfx-hf-backtest">bfx-hf-backtest</a> for backtesting on
historical data, or <a href="https://github.com/bitfinexcom/bfx-hf-strategy-exec">bfx-hf-strategy-exec</a> for live
execution.</p>
</dd>
<dt><a href="#StrategyPosition">StrategyPosition</a> : <code>object</code></dt>
<dd><p>An object representing a strategy position in a market, including all
relevant <a href="#StrategyTrade">trades</a>.</p>
</dd>
<dt><a href="#StrategyState">StrategyState</a></dt>
<dd><p>Strategy state updated throughout the lifetime of a strategy, used for both
backtesting and live execution. The core of this library.</p>
</dd>
<dt><a href="#StrategyTrade">StrategyTrade</a></dt>
<dd><p>A trade performed by a strategy</p>
</dd>
</dl>

<a name="module_bfx-hf-strategy"></a>

## bfx-hf-strategy
This module serves as a framework for creating trading bots/strategies on
the Bitfinex platform. It consists of a set of order methods and an
architecture compatible with [bfx-hf-data-server](https://github.com/bitfinexcom/bfx-hf-data-server) and
[bfx-hf-backtest](https://github.com/bitfinexcom/bfx-hf-backtest) for backtests on historical candle/trade
data, which can be transitioned seamlessly to trading on the live markets.

Strategies written using this framework must define an `exec` function which
in turn is provided an instance of the
[RuntimeHelpers](#module_bfx-hf-strategy/RuntimeHelpers) object bound to
that strategy during execution. The helpers can be used to control the
execution flow of the strategy, inspect data & indicators, and make
automated trading decisions.

See [RuntimeHelpers](#module_bfx-hf-strategy/RuntimeHelpers) for a full
list of methods available to the strategy `exec` function.

**License**: Apache-2.0  
**Example**  
```js
const { SYMBOLS, TIME_FRAMES } = require('bfx-hf-util')
const HFS = require('bfx-hf-strategy')

const SYMBOL = SYMBOLS.BTC_USD
const TF = TIME_FRAMES.ONE_HOUR

const ExampleStrategy = ({ symbol, tf }) => HFS.define({
  id: 'example',
  name: 'example',
  takerFee: (0.002 * 1),
  makerFee: (0.001 * 1),
  keepOpenPositionsAtEnd: false,
  simulateLiveCandleEnabled: true,
  symbol,
  tf,

  // This quickstart example immediately opens a long position, and then no
  // longer reacts to future market updates
  exec: async function () {
    if (!this.inAPosition()) {
      return this.openLongPositionMarket({
        mtsCreate: mts,
        amount: 1,
        price
      })
    }
  }
})

let execState = ExampleStrategy({ SYMBOL, TF })

for (let i = 0; i < candles.length; i += 1) {
  execState = await HFS.onCandle(execState, candles[i])
}

execState = await HFS.closeOpenPositions(execState)

HFS.logTrades(execState)
```
<a name="module_bfx-hf-strategy/RuntimeHelpers"></a>

## bfx-hf-strategy/RuntimeHelpers
A set of utility functions bound to the strategy they are used in, providing
control over strategy execution, access to data, and order manipulation
methods.


* [bfx-hf-strategy/RuntimeHelpers](#module_bfx-hf-strategy/RuntimeHelpers)
    * [.isBacktesting](#module_bfx-hf-strategy/RuntimeHelpers.isBacktesting) ⇒ <code>boolean</code>
    * [.liveLog](#module_bfx-hf-strategy/RuntimeHelpers.liveLog)
    * [.fees](#module_bfx-hf-strategy/RuntimeHelpers.fees) ⇒ <code>object</code>
    * [.nCandles](#module_bfx-hf-strategy/RuntimeHelpers.nCandles) ⇒ <code>number</code>
    * [.candles](#module_bfx-hf-strategy/RuntimeHelpers.candles) ⇒ <code>Array.&lt;bfx-api-node-models.Candle&gt;</code>
    * [.currentCandle](#module_bfx-hf-strategy/RuntimeHelpers.currentCandle) ⇒ <code>bfx-api-node-models.Candle</code>
    * [.prevCandles](#module_bfx-hf-strategy/RuntimeHelpers.prevCandles) ⇒ <code>Array.&lt;bfx-api-node-models.Candle&gt;</code>
    * [.indicatorWasNotRecently](#module_bfx-hf-strategy/RuntimeHelpers.indicatorWasNotRecently) ⇒ <code>boolean</code>
    * [.trades](#module_bfx-hf-strategy/RuntimeHelpers.trades) ⇒ [<code>Array.&lt;StrategyTrade&gt;</code>](#StrategyTrade)
    * [.closeOpenPositions](#module_bfx-hf-strategy/RuntimeHelpers.closeOpenPositions) ⇒ <code>Promise</code>
    * [.closePosition](#module_bfx-hf-strategy/RuntimeHelpers.closePosition) ⇒ <code>Promise</code>
    * [.closePositionLimit](#module_bfx-hf-strategy/RuntimeHelpers.closePositionLimit) ⇒ <code>Promise</code>
    * [.closePositionMarket](#module_bfx-hf-strategy/RuntimeHelpers.closePositionMarket) ⇒ <code>Promise</code>
    * [.closePositionWithOrder](#module_bfx-hf-strategy/RuntimeHelpers.closePositionWithOrder) ⇒ <code>Promise</code>
    * [.openLongPosition](#module_bfx-hf-strategy/RuntimeHelpers.openLongPosition) ⇒ <code>Promise</code>
    * [.openLongPositionLimit](#module_bfx-hf-strategy/RuntimeHelpers.openLongPositionLimit) ⇒ <code>Promise</code>
    * [.openLongPositionMarket](#module_bfx-hf-strategy/RuntimeHelpers.openLongPositionMarket) ⇒ <code>Promise</code>
    * [.openPosition](#module_bfx-hf-strategy/RuntimeHelpers.openPosition) ⇒ <code>Promise</code>
    * [.openPositionLimit](#module_bfx-hf-strategy/RuntimeHelpers.openPositionLimit) ⇒ <code>Promise</code>
    * [.openPositionMarket](#module_bfx-hf-strategy/RuntimeHelpers.openPositionMarket) ⇒ <code>Promise</code>
    * [.openPositionWithOrder](#module_bfx-hf-strategy/RuntimeHelpers.openPositionWithOrder) ⇒ <code>Promise</code>
    * [.openShortPosition](#module_bfx-hf-strategy/RuntimeHelpers.openShortPosition) ⇒ <code>Promise</code>
    * [.openShortPositionLimit](#module_bfx-hf-strategy/RuntimeHelpers.openShortPositionLimit) ⇒ <code>Promise</code>
    * [.openShortPositionMarket](#module_bfx-hf-strategy/RuntimeHelpers.openShortPositionMarket) ⇒ <code>Promise</code>
    * [.updateLongPosition](#module_bfx-hf-strategy/RuntimeHelpers.updateLongPosition) ⇒ <code>Promise</code>
    * [.updateLongPositionLimit](#module_bfx-hf-strategy/RuntimeHelpers.updateLongPositionLimit) ⇒ <code>Promise</code>
    * [.updateLongPositionMarket](#module_bfx-hf-strategy/RuntimeHelpers.updateLongPositionMarket) ⇒ <code>Promise</code>
    * [.updatePosition](#module_bfx-hf-strategy/RuntimeHelpers.updatePosition) ⇒ <code>Promise</code>
    * [.updatePositionLimit](#module_bfx-hf-strategy/RuntimeHelpers.updatePositionLimit) ⇒ <code>Promise</code>
    * [.updatePositionMarket](#module_bfx-hf-strategy/RuntimeHelpers.updatePositionMarket) ⇒ <code>Promise</code>
    * [.updatePositionWithOrder](#module_bfx-hf-strategy/RuntimeHelpers.updatePositionWithOrder) ⇒ <code>Promise</code>
    * [.updateShortPosition](#module_bfx-hf-strategy/RuntimeHelpers.updateShortPosition) ⇒ <code>Promise</code>
    * [.updateShortPositionLimit](#module_bfx-hf-strategy/RuntimeHelpers.updateShortPositionLimit) ⇒ <code>Promise</code>
    * [.updateShortPositionMarket](#module_bfx-hf-strategy/RuntimeHelpers.updateShortPositionMarket) ⇒ <code>Promise</code>
    * [.withNoPosition](#module_bfx-hf-strategy/RuntimeHelpers.withNoPosition) ⇒ <code>Promise</code>
    * [.withPosition](#module_bfx-hf-strategy/RuntimeHelpers.withPosition) ⇒ <code>Promise</code>
    * [.minTradeIntervalMet](#module_bfx-hf-strategy/RuntimeHelpers.minTradeIntervalMet) ⇒ <code>boolean</code>
    * [.lastTrade](#module_bfx-hf-strategy/RuntimeHelpers.lastTrade) ⇒ <code>bfx-api-node-models.PublicTrade</code>
    * [.ticksSinceLastTrade](#module_bfx-hf-strategy/RuntimeHelpers.ticksSinceLastTrade) ⇒ <code>number</code>
    * [.enforceMinTradeInterval](#module_bfx-hf-strategy/RuntimeHelpers.enforceMinTradeInterval)
    * [.getState](#module_bfx-hf-strategy/RuntimeHelpers.getState) ⇒ [<code>StrategyState</code>](#StrategyState)
    * [.getLastPrice](#module_bfx-hf-strategy/RuntimeHelpers.getLastPrice) ⇒ <code>number</code>
    * [.indicatorValues](#module_bfx-hf-strategy/RuntimeHelpers.indicatorValues) ⇒ <code>object</code>
    * [.indicators](#module_bfx-hf-strategy/RuntimeHelpers.indicators) ⇒ <code>object</code>
    * [.inAPosition](#module_bfx-hf-strategy/RuntimeHelpers.inAPosition) ⇒ <code>boolean</code>
    * [.inALongPosition](#module_bfx-hf-strategy/RuntimeHelpers.inALongPosition) ⇒ <code>boolean</code>
    * [.inAShortPosition](#module_bfx-hf-strategy/RuntimeHelpers.inAShortPosition) ⇒ <code>boolean</code>
    * [.condition](#module_bfx-hf-strategy/RuntimeHelpers.condition)
    * [.conditionIndicatorCrossed](#module_bfx-hf-strategy/RuntimeHelpers.conditionIndicatorCrossed)
    * [.conditionIndicatorsCrossed](#module_bfx-hf-strategy/RuntimeHelpers.conditionIndicatorsCrossed)
    * [.conditionInAPosition](#module_bfx-hf-strategy/RuntimeHelpers.conditionInAPosition)

<a name="module_bfx-hf-strategy/RuntimeHelpers.isBacktesting"></a>

### bfx-hf-strategy/RuntimeHelpers.isBacktesting ⇒ <code>boolean</code>
Indicates if the strategy is under backtest

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>boolean</code> - isBacktesting  
<a name="module_bfx-hf-strategy/RuntimeHelpers.liveLog"></a>

### bfx-hf-strategy/RuntimeHelpers.liveLog
Helper to log via `debug` only during live execution (no-op under
backtest)

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>string</code> \| <code>number</code> \| <code>object</code> \| <code>Array</code> | passed to `debug` |

<a name="module_bfx-hf-strategy/RuntimeHelpers.fees"></a>

### bfx-hf-strategy/RuntimeHelpers.fees ⇒ <code>object</code>
Get strategy fees

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>object</code> - fees - { maker, taker }  
<a name="module_bfx-hf-strategy/RuntimeHelpers.nCandles"></a>

### bfx-hf-strategy/RuntimeHelpers.nCandles ⇒ <code>number</code>
Get the number of seen candles

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>number</code> - nCandles  

| Param | Type | Description |
| --- | --- | --- |
| [symbol] | <code>string</code> | defaults to strategy `symbol` |
| [tf] | <code>string</code> | defaults to strategy `tf` |

<a name="module_bfx-hf-strategy/RuntimeHelpers.candles"></a>

### bfx-hf-strategy/RuntimeHelpers.candles ⇒ <code>Array.&lt;bfx-api-node-models.Candle&gt;</code>
Get all seen candles

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Array.&lt;bfx-api-node-models.Candle&gt;</code> - candles  

| Param | Type | Description |
| --- | --- | --- |
| [symbol] | <code>string</code> | defaults to strategy `symbol` |
| [tf] | <code>string</code> | defaults to strategy `tf` |

<a name="module_bfx-hf-strategy/RuntimeHelpers.currentCandle"></a>

### bfx-hf-strategy/RuntimeHelpers.currentCandle ⇒ <code>bfx-api-node-models.Candle</code>
Get the most recent seen candle

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>bfx-api-node-models.Candle</code> - candle  

| Param | Type | Description |
| --- | --- | --- |
| [symbol] | <code>string</code> | defaults to strategy `symbol` |
| [tf] | <code>string</code> | defaults to strategy `tf` |

<a name="module_bfx-hf-strategy/RuntimeHelpers.prevCandles"></a>

### bfx-hf-strategy/RuntimeHelpers.prevCandles ⇒ <code>Array.&lt;bfx-api-node-models.Candle&gt;</code>
Get the previous `n` candles

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Array.&lt;bfx-api-node-models.Candle&gt;</code> - candles  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [n] | <code>number</code> | <code>1</code> | number of candles to return |
| [offset] | <code>number</code> | <code>0</code> | offset from most recent candle |
| [symbol] | <code>string</code> |  | defaults to strategy `symbol` |
| [tf] | <code>string</code> |  | defaults to strategy `tf` |

<a name="module_bfx-hf-strategy/RuntimeHelpers.indicatorWasNotRecently"></a>

### bfx-hf-strategy/RuntimeHelpers.indicatorWasNotRecently ⇒ <code>boolean</code>
Checks if the specified indicator did not recently meet the specified
condition; as some indicators store multiple numeric values per data point
(MACD, etc), a variable-type condition is supported and passed to `_some`.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>boolean</code> - wasNot  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | indicator ID |
| condition | <code>object</code> \| <code>number</code> \| <code>Array</code> |  | passed to `_some` against all   indicator values in the lookback period |
| [lookback] | <code>number</code> | <code>30</code> | number of previous indicator values to   check the condition against |

<a name="module_bfx-hf-strategy/RuntimeHelpers.trades"></a>

### bfx-hf-strategy/RuntimeHelpers.trades ⇒ [<code>Array.&lt;StrategyTrade&gt;</code>](#StrategyTrade)
Returns the strategy's trades

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: [<code>Array.&lt;StrategyTrade&gt;</code>](#StrategyTrade) - trades  
<a name="module_bfx-hf-strategy/RuntimeHelpers.closeOpenPositions"></a>

### bfx-hf-strategy/RuntimeHelpers.closeOpenPositions ⇒ <code>Promise</code>
Closes all open positions with market orders

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
<a name="module_bfx-hf-strategy/RuntimeHelpers.closePosition"></a>

### bfx-hf-strategy/RuntimeHelpers.closePosition ⇒ <code>Promise</code>
Closes an open position with an order.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if no position is open for the symbol, or if given
  invalid order parameters


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.closePositionLimit"></a>

### bfx-hf-strategy/RuntimeHelpers.closePositionLimit ⇒ <code>Promise</code>
Closes a position with a limit order

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if no position is open for the symbol, or if given
  invalid order parameters


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.closePositionMarket"></a>

### bfx-hf-strategy/RuntimeHelpers.closePositionMarket ⇒ <code>Promise</code>
Closes a position with a market order

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if no position is open for the symbol, or if given
  invalid order parameters


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.closePositionWithOrder"></a>

### bfx-hf-strategy/RuntimeHelpers.closePositionWithOrder ⇒ <code>Promise</code>
Closes an open position with an order.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if no position is open for the symbol, if the
  provided order would not close the position, or if given invalid order
  parameters


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.openLongPosition"></a>

### bfx-hf-strategy/RuntimeHelpers.openLongPosition ⇒ <code>Promise</code>
Alias for openPositon

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.openLongPositionLimit"></a>

### bfx-hf-strategy/RuntimeHelpers.openLongPositionLimit ⇒ <code>Promise</code>
Opens a new long position with a limit order

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.openLongPositionMarket"></a>

### bfx-hf-strategy/RuntimeHelpers.openLongPositionMarket ⇒ <code>Promise</code>
Opens a new long position with a market order

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.openPosition"></a>

### bfx-hf-strategy/RuntimeHelpers.openPosition ⇒ <code>Promise</code>
Opens a position with a new order; resolves to an error if a position is
already open.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if a position already exists for the specified
  symbol


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | passed directly to order constructor |

<a name="module_bfx-hf-strategy/RuntimeHelpers.openPositionLimit"></a>

### bfx-hf-strategy/RuntimeHelpers.openPositionLimit ⇒ <code>Promise</code>
Opens a new position with a limit order

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if a position already exists for the specified
  symbol


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.openPositionMarket"></a>

### bfx-hf-strategy/RuntimeHelpers.openPositionMarket ⇒ <code>Promise</code>
Opens a new position with a market order. Pulls order timestamp and price
from last received data for the order's symbol.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> If no timestamp or price data available and none supplied


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.openPositionWithOrder"></a>

### bfx-hf-strategy/RuntimeHelpers.openPositionWithOrder ⇒ <code>Promise</code>
Submits a new order via ws2 with the supplied parameters, creates a new
strategy trade and creates a position.

If no ws client is available, no data is saved & no order is dispatched

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if a position already exists for the specified
  symbol


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.openShortPosition"></a>

### bfx-hf-strategy/RuntimeHelpers.openShortPosition ⇒ <code>Promise</code>
Opens a short position (negates passed amount)

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if a position already exists for the specified
  symbol


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.openShortPositionLimit"></a>

### bfx-hf-strategy/RuntimeHelpers.openShortPositionLimit ⇒ <code>Promise</code>
Opens a short position (negates passed amount)

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if a position already exists for the specified
  symbol


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.openShortPositionMarket"></a>

### bfx-hf-strategy/RuntimeHelpers.openShortPositionMarket ⇒ <code>Promise</code>
Opens a short position (negates passed amount)

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if a position already exists for the specified
  symbol


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.updateLongPosition"></a>

### bfx-hf-strategy/RuntimeHelpers.updateLongPosition ⇒ <code>Promise</code>
**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.updateLongPositionLimit"></a>

### bfx-hf-strategy/RuntimeHelpers.updateLongPositionLimit ⇒ <code>Promise</code>
Updates a long position with a limit order

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.updateLongPositionMarket"></a>

### bfx-hf-strategy/RuntimeHelpers.updateLongPositionMarket ⇒ <code>Promise</code>
Updates a long position with a market order

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.updatePosition"></a>

### bfx-hf-strategy/RuntimeHelpers.updatePosition ⇒ <code>Promise</code>
Alias for updatePositionWithOrder

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | passed directly to order constructor |

<a name="module_bfx-hf-strategy/RuntimeHelpers.updatePositionLimit"></a>

### bfx-hf-strategy/RuntimeHelpers.updatePositionLimit ⇒ <code>Promise</code>
Updates a position with a limit order

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.updatePositionMarket"></a>

### bfx-hf-strategy/RuntimeHelpers.updatePositionMarket ⇒ <code>Promise</code>
Updates a new position with a market order. Pulls order timestamp and
price from last received data for the order's symbol.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> If no timestamp or price data available and none supplied


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.updatePositionWithOrder"></a>

### bfx-hf-strategy/RuntimeHelpers.updatePositionWithOrder ⇒ <code>Promise</code>
Submits a new order via ws2 with the supplied parameters, creates a new
strategy trade and updates the current position.

If no ws client is available, no data is saved & no order is dispatched

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if no position is open for the symbol, if the order
  would close the position, or if given invalid order parameters


| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.updateShortPosition"></a>

### bfx-hf-strategy/RuntimeHelpers.updateShortPosition ⇒ <code>Promise</code>
Updates a short position (negates passed amount)

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.updateShortPositionLimit"></a>

### bfx-hf-strategy/RuntimeHelpers.updateShortPositionLimit ⇒ <code>Promise</code>
Updates a short position (negates passed amount)

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.updateShortPositionMarket"></a>

### bfx-hf-strategy/RuntimeHelpers.updateShortPositionMarket ⇒ <code>Promise</code>
Updates a short position (negates passed amount)

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="module_bfx-hf-strategy/RuntimeHelpers.withNoPosition"></a>

### bfx-hf-strategy/RuntimeHelpers.withNoPosition ⇒ <code>Promise</code>
Calls the provided async function if no position is open for the symbol

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| [symbol] | <code>string</code> | symbol |
| f | <code>function</code> | async function to call if no position is open |

<a name="module_bfx-hf-strategy/RuntimeHelpers.withPosition"></a>

### bfx-hf-strategy/RuntimeHelpers.withPosition ⇒ <code>Promise</code>
Calls the provided async function with the position if it is open

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| [symbol] | <code>string</code> | symbol |
| f | <code>function</code> | async function to call if position is open |

<a name="module_bfx-hf-strategy/RuntimeHelpers.minTradeIntervalMet"></a>

### bfx-hf-strategy/RuntimeHelpers.minTradeIntervalMet ⇒ <code>boolean</code>
Evaluates whether the time since the last strategy trade is greater than
the specified interval in milliseconds.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>boolean</code> - intervalMet  

| Param | Type | Description |
| --- | --- | --- |
| intervalMS | <code>number</code> | interval in milliseconds |

<a name="module_bfx-hf-strategy/RuntimeHelpers.lastTrade"></a>

### bfx-hf-strategy/RuntimeHelpers.lastTrade ⇒ <code>bfx-api-node-models.PublicTrade</code>
Get the most recently seen trade

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>bfx-api-node-models.PublicTrade</code> - trade  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [n] | <code>number</code> | <code>0</code> | trade index |

<a name="module_bfx-hf-strategy/RuntimeHelpers.ticksSinceLastTrade"></a>

### bfx-hf-strategy/RuntimeHelpers.ticksSinceLastTrade ⇒ <code>number</code>
Query the number of intervals since the last trade by interval width

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>number</code> - ticks  

| Param | Type | Description |
| --- | --- | --- |
| [tf] | <code>string</code> | defaults to strategy tf |

<a name="module_bfx-hf-strategy/RuntimeHelpers.enforceMinTradeInterval"></a>

### bfx-hf-strategy/RuntimeHelpers.enforceMinTradeInterval
Breaks execution if the time since the last strategy trade is less than
the specified interval in milliseconds.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| intervalMS | <code>number</code> | interval in milliseconds |

<a name="module_bfx-hf-strategy/RuntimeHelpers.getState"></a>

### bfx-hf-strategy/RuntimeHelpers.getState ⇒ [<code>StrategyState</code>](#StrategyState)
Returns the strategy state

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: [<code>StrategyState</code>](#StrategyState) - state  
<a name="module_bfx-hf-strategy/RuntimeHelpers.getLastPrice"></a>

### bfx-hf-strategy/RuntimeHelpers.getLastPrice ⇒ <code>number</code>
Returns the last received price (from a trade or candle) for the specified
symbol/timeframe pair.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>number</code> - lastPrice  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>string</code> | defaults to default strategy symbol |
| tf | <code>string</code> | defaults to default strategy timeframe |

<a name="module_bfx-hf-strategy/RuntimeHelpers.indicatorValues"></a>

### bfx-hf-strategy/RuntimeHelpers.indicatorValues ⇒ <code>object</code>
Returns a map of indicator values key'ed by indicator ID

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>object</code> - values  
<a name="module_bfx-hf-strategy/RuntimeHelpers.indicators"></a>

### bfx-hf-strategy/RuntimeHelpers.indicators ⇒ <code>object</code>
Returns a map of indicators key'ed by ID

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>object</code> - indicators  
<a name="module_bfx-hf-strategy/RuntimeHelpers.inAPosition"></a>

### bfx-hf-strategy/RuntimeHelpers.inAPosition ⇒ <code>boolean</code>
Returns true if a position is open for the specified symbol

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>boolean</code> - inPosition  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>string</code> | defaults to default strategy symbol |

<a name="module_bfx-hf-strategy/RuntimeHelpers.inALongPosition"></a>

### bfx-hf-strategy/RuntimeHelpers.inALongPosition ⇒ <code>boolean</code>
Returns true if a long position is open for the specified symbol.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>boolean</code> - inLongPosition  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>string</code> | defaults to default strategy symbol |

<a name="module_bfx-hf-strategy/RuntimeHelpers.inAShortPosition"></a>

### bfx-hf-strategy/RuntimeHelpers.inAShortPosition ⇒ <code>boolean</code>
Returns true if a short position is open for the specified symbol.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Returns**: <code>boolean</code> - inShortPosition  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>string</code> | defaults to default strategy symbol |

<a name="module_bfx-hf-strategy/RuntimeHelpers.condition"></a>

### bfx-hf-strategy/RuntimeHelpers.condition
Interrupts execution if the condition is not meant. Either parameter to
the condition can be an indicator ID or literal. If given an indicator
ID and the indicator has sub-values (i.e. bollinger bands), the sub-value
name can be specified following a dot after the indicator name
(i.e. 'bb.middle')

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Throws**:

- <code>Error</code> Fails if given an unknown indicator ID. Logs an error if
  executing live.


| Param | Type | Description |
| --- | --- | --- |
| a | <code>string</code> \| <code>number</code> | indicator ID or literal |
| condition | <code>string</code> | one of (=, ==, eq), (!=, !==, neq), (>, gt),   (>=, gte), (<, lt), or (<=, lte) |
| b | <code>string</code> \| <code>number</code> | indicator ID or literal |

<a name="module_bfx-hf-strategy/RuntimeHelpers.conditionIndicatorCrossed"></a>

### bfx-hf-strategy/RuntimeHelpers.conditionIndicatorCrossed
Interrupts execution if the specified indicator did not cross the provided
literal value. Always breaks execution when given an unknown indicator ID
and running live.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Throws**:

- <code>Error</code> Fails if an unknown indicator was specified and
  backtesting. Logs an error if executing live.


| Param | Type | Description |
| --- | --- | --- |
| iID | <code>string</code> | ID of indicator |
| v | <code>number</code> | literal value |

<a name="module_bfx-hf-strategy/RuntimeHelpers.conditionIndicatorsCrossed"></a>

### bfx-hf-strategy/RuntimeHelpers.conditionIndicatorsCrossed
Interrupts execution if the specified indicators did not cross values.
Always breaks execution when given an uknown indicator ID and running
live.

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  
**Throws**:

- <code>Error</code> Fails if either indicator ID is unknown and backtesting.
  Logs an error if executing live.


| Param | Type | Description |
| --- | --- | --- |
| iaID | <code>string</code> | ID of first indicator |
| ibID | <code>string</code> | ID of second indicator |

<a name="module_bfx-hf-strategy/RuntimeHelpers.conditionInAPosition"></a>

### bfx-hf-strategy/RuntimeHelpers.conditionInAPosition
Interrupts strategy execution if not in a position for the specified
symbol

**Kind**: static property of [<code>bfx-hf-strategy/RuntimeHelpers</code>](#module_bfx-hf-strategy/RuntimeHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>string</code> | defaults to default strategy symbol |

<a name="ErrorInterruptExec"></a>

## ErrorInterruptExec ⇐ <code>Error</code>
Error meant to be caught safely when thrown, in order to interrupt flow

**Kind**: global class  
**Extends**: <code>Error</code>  
<a name="addCandleData"></a>

## addCandleData(state, candle)
Updates the candle dataset in-place with a new candle

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| candle | <code>bfx-api-node-models.Candle</code> | incoming candle |

<a name="addTradeData"></a>

## addTradeData(state, trade) ⇒ [<code>StrategyState</code>](#StrategyState)
Updates the trade dataset in-place with a new trade.

**Kind**: global function  
**Returns**: [<code>StrategyState</code>](#StrategyState) - state - same state reference  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| trade | <code>bfx-api-node-models.PublicTrade</code> | incoming trade |

<a name="candleMarketDataKey"></a>

## candleMarketDataKey(candle) ⇒ <code>string</code>
Generates key for candle market data on strategy state

**Kind**: global function  
**Returns**: <code>string</code> - key  

| Param | Type | Description |
| --- | --- | --- |
| candle | <code>bfx-api-node-models.Candle</code> | candle to generate key for |

<a name="getCandle"></a>

## getCandle(state, n, symbol, tf) ⇒ <code>bfx-api-node-models.Candle</code>
Reverses candle sort, n = 0 for most recent candle

**Kind**: global function  
**Returns**: <code>bfx-api-node-models.Candle</code> - candle  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) |  | strategy state |
| n | <code>number</code> | <code>0</code> | index |
| symbol | <code>string</code> |  | symbol |
| tf | <code>string</code> |  | timeframe |

<a name="getCandles"></a>

## getCandles(state, forSymbol, forTF) ⇒ <code>Array.&lt;Candle&gt;</code>
Returns the candle dataset for the specified symbol/timeframe pair

**Kind**: global function  
**Returns**: <code>Array.&lt;Candle&gt;</code> - candles - sorted oldest first  
**Throws**:

- <code>Error</code> fails if either symbol or timeframe are not specified


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| forSymbol | <code>string</code> | defaults to strategy symbol |
| forTF | <code>string</code> | defaults to strategy tf |

<a name="getDefaultCandles"></a>

## getDefaultCandles(state) ⇒ <code>Array.&lt;Candle&gt;</code>
Returns the candle dataset for the default symbol/tf pair

**Kind**: global function  
**Returns**: <code>Array.&lt;Candle&gt;</code> - candles  
**Throws**:

- <code>Error</code> fails if either symbol or timeframe are not specified


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="getDefaultSymbol"></a>

## getDefaultSymbol(state) ⇒ <code>string</code>
Returns the default symbol for the strategy; a strategy can have either a
set of multiple symbols, a single default 'symbol' defined, or both.

**Kind**: global function  
**Returns**: <code>string</code> - defaultSymbol  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="getDefaultTF"></a>

## getDefaultTF(state) ⇒ <code>string</code>
Returns the default time frame for the strategy; a strategy can have either a
set of multiple time frames, a single default time frame, or both.

**Kind**: global function  
**Returns**: <code>string</code> - defaultTF  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="getDefaultTrades"></a>

## getDefaultTrades(state) ⇒ <code>Array.&lt;object&gt;</code>
Returns the trade dataset for the default symbol

**Kind**: global function  
**Returns**: <code>Array.&lt;object&gt;</code> - trades  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="getFees"></a>

## getFees(state) ⇒ <code>object</code>
Extracts fee data from strategy state

**Kind**: global function  
**Returns**: <code>object</code> - fees - { maker, taker }  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="getIndicator"></a>

## getIndicator(state, id) ⇒ <code>Indicator</code>
Returns an indicator by ID

**Kind**: global function  
**Returns**: <code>Indicator</code> - indicator  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| id | <code>string</code> | indicator ID |

<a name="getIndicators"></a>

## getIndicators(state) ⇒ <code>object</code>
Returns the indicator map for the strategy

**Kind**: global function  
**Returns**: <code>object</code> - indicators  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="getLastPrice"></a>

## getLastPrice(state, [forSymbol], [forTF]) ⇒ <code>object</code>
Get the last price & timestamp received for the specified symbol & tf.

**Kind**: global function  
**Returns**: <code>object</code> - pp - price point, { mts, price } (null if unavailable)  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| [forSymbol] | <code>string</code> | defaults to default strategy symbol |
| [forTF] | <code>string</code> | defaults to default strategy tf |

<a name="getNumCandles"></a>

## getNumCandles(state, symbol, tf) ⇒ <code>number</code>
Returns the number of received candles for the specified symbol/timeframe
pair

**Kind**: global function  
**Returns**: <code>number</code> - numCandles  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| symbol | <code>string</code> | defaults to strategy symbol |
| tf | <code>string</code> | defaults to strategy time frame |

<a name="getNumTrades"></a>

## getNumTrades(state, symbol) ⇒ <code>number</code>
Returns the number of received trades for the specified symbol/timeframe
pair.

**Kind**: global function  
**Returns**: <code>number</code> - numTrades  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| symbol | <code>string</code> | defaults to strategy symbol |

<a name="getPosition"></a>

## getPosition(state, [forSymbol]) ⇒ <code>Position</code>
Returns the position for the specified symbol

**Kind**: global function  
**Returns**: <code>Position</code> - position - may be null  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| [forSymbol] | <code>string</code> | defaults to default strategy symbol |

<a name="getStrategyTrades"></a>

## getStrategyTrades(state) ⇒ [<code>Array.&lt;StrategyTrade&gt;</code>](#StrategyTrade)
Returns an array of trades executed by the strategy

**Kind**: global function  
**Returns**: [<code>Array.&lt;StrategyTrade&gt;</code>](#StrategyTrade) - trades - sorted oldest first  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="getTrade"></a>

## getTrade(state, n, symbol) ⇒ <code>bfx-api-node-models.PublicTrade</code>
Returns the trade for the specified market at the specified index. Reverses
trade sort, set n = 0 for most recent trade.

**Kind**: global function  
**Returns**: <code>bfx-api-node-models.PublicTrade</code> - trade  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) |  | strategy state |
| n | <code>number</code> | <code>0</code> | index |
| symbol | <code>string</code> |  | symbol |

<a name="getTrades"></a>

## getTrades(state, [symbol]) ⇒ <code>Array.&lt;Trade&gt;</code>
Returns all known trades for the specified symbol

**Kind**: global function  
**Returns**: <code>Array.&lt;Trade&gt;</code> - trades - sorted oldest first  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) |  | strategy state |
| [symbol] | <code>string</code> | <code>null</code> | defaults to strategy symbol |

<a name="isLong"></a>

## isLong(state, [forSymbol]) ⇒ <code>boolean</code>
Queries if a long position is open for the specified symbol

**Kind**: global function  
**Returns**: <code>boolean</code> - isLong  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| [forSymbol] | <code>string</code> | defaults to strategy symbol |

<a name="isShort"></a>

## isShort(state, [forSymbol]) ⇒ <code>boolean</code>
Queries if a short position is open for the specified symbol

**Kind**: global function  
**Returns**: <code>boolean</code> - isShort  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| [forSymbol] | <code>string</code> | defaults to strategy symbol |

<a name="positionPL"></a>

## positionPL(position, [closePrice]) ⇒ <code>number</code>
Returns the P/L figure for the specified position, taking into account all
trades & a close with the provided price (optional)

**Kind**: global function  
**Returns**: <code>number</code> - pl  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>object</code> | position |
| [closePrice] | <code>number</code> | used if position not already closed |

<a name="tradeMarketDataKey"></a>

## tradeMarketDataKey(trade) ⇒ <code>string</code>
Generates key for trade market data on strategy state

**Kind**: global function  
**Returns**: <code>string</code> - key  

| Param | Type | Description |
| --- | --- | --- |
| trade | <code>bfx-api-node-models.PublicTrade</code> | trade to generate key for |

<a name="updatePositionWithTrade"></a>

## updatePositionWithTrade(position, trade)
Adds the trade to the position state

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>Position</code> | position |
| trade | <code>bfx-api-node-models.PublicTrade</code> | trade |

<a name="logTrades"></a>

## logTrades(strategy)
Prints strategy execution information to the console

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| strategy | [<code>StrategyState</code>](#StrategyState) | strategy |

<a name="defineStrategy"></a>

## defineStrategy(args) ⇒ [<code>StrategyState</code>](#StrategyState)
Returns an initial strategy state object for the provided arguments. The
state object can then be used with the various HF strategy methods.

**Kind**: global function  
**Returns**: [<code>StrategyState</code>](#StrategyState) - state - strategy state  

| Param | Type | Description |
| --- | --- | --- |
| args | [<code>StrategyDefinition</code>](#StrategyDefinition) | definition |

<a name="safeThrow"></a>

## safeThrow(state, error)
Throws the error if backtesting, logs it otherwise.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| error | <code>string</code> \| <code>Error</code> | error, can be a string or an Error instance |

<a name="throwsIfOrderClosesPosition"></a>

## throwsIfOrderClosesPosition(state, order)
**Kind**: global function  
**Throws**:

- <code>Error</code> throws if no position exists for the order or the order
  would close an existing position.


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| order | <code>bfx-api-node-models.Order</code> | order |

<a name="addIndicatorData"></a>

## addIndicatorData(state, type, update)
Adds the provided data update packet to all strategy indicators matching the
update type.

**Kind**: global function  
**Throws**:

- <code>Error</code> fails if given an unknown data type


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| type | <code>string</code> | data type, 'trade' or 'candle' |
| update | <code>object</code> | data point |

<a name="findIndicator"></a>

## findIndicator(state, f) ⇒ <code>Indicator</code>
Returns the first indicator in the strategy for which the provided function
evaluates to true.

**Kind**: global function  
**Returns**: <code>Indicator</code> - i - null if not found  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| f | <code>function</code> | called with (indicator, id) |

<a name="forEachIndicator"></a>

## forEachIndicator(state, f)
Calls the provided function with each indicator on the strategy.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| f | <code>function</code> | function to call |

<a name="indicatorValues"></a>

## indicatorValues(state) ⇒ <code>object</code>
Returns a map of all indicator values for the provided strategy

**Kind**: global function  
**Returns**: <code>object</code> - iv  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="indicatorsExec"></a>

## indicatorsExec(state, fn) ⇒ <code>object</code>
Executes the specified function in all strategy indicators, and returns the
results in a map matching the indicator map structure.

**Kind**: global function  
**Returns**: <code>object</code> - results  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| fn | <code>string</code> | function name |

<a name="indicatorsReady"></a>

## indicatorsReady(state) ⇒ <code>boolean</code>
Checks if all indicators have been marked as ready (seed period fulfilled)

**Kind**: global function  
**Returns**: <code>boolean</code> - ready - true if all indicators are ready  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="indicators"></a>

## indicators(state) ⇒ <code>object</code>
Strategy indicators selector

**Kind**: global function  
**Returns**: <code>object</code> - indicators  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="resetIndicators"></a>

## resetIndicators(state)
Resets all of the strategy's indicators

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="seedPeriodForIndicators"></a>

## seedPeriodForIndicators(state) ⇒ <code>number</code>
Returns the minimum seed period required for the strategy

**Kind**: global function  
**Returns**: <code>number</code> - seedPeriod  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="updateIndicatorData"></a>

## updateIndicatorData(state, type, update)
Updates the most recent data point for all suitable indicators

**Kind**: global function  
**Throws**:

- <code>Error</code> fails if given an unknown data type


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| type | <code>string</code> | update type, 'trade' or 'candle' |
| update | <code>object</code> \| <code>number</code> | data point |

<a name="simulateOrderFill"></a>

## simulateOrderFill(orderParams, [fillAmount]) ⇒ <code>bfx-api-node-models.Order</code>
Simulates a fill for backtests, replaces submitOrder()

**Kind**: global function  
**Returns**: <code>bfx-api-node-models.Order</code> - filledOrder  
**Throws**:

- <code>Error</code> Fails if the fill amount is larger than the order size


| Param | Type | Description |
| --- | --- | --- |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |
| [fillAmount] | <code>number</code> | defaults to entire order |

<a name="submitOrder"></a>

## submitOrder(state, order) ⇒ <code>Promise</code>
Submit an order using either a Bitfinex array-format order, order model
instance, or a raw order parameters object.

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to full Order model  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| order | <code>object</code> \| <code>Array</code> \| <code>bfx-api-node-models.Order</code> | order or order   parameters |

<a name="submitTrade"></a>

## submitTrade(state, orderParams) ⇒ <code>object</code>
Creates & submits the order, and returns the generated DB trade

**Kind**: global function  
**Returns**: <code>object</code> - res - map of order and trade objects  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | <code>object</code> \| <code>Array</code> \| <code>bfx-api-node-models.Order</code> | order or order   parameters |

<a name="validateOrderParams"></a>

## validateOrderParams(state, orderParams)
Ensures the provided parameters contain an amount, valid type, and valid
symbol

**Kind**: global function  
**Throws**:

- <code>Error</code> throws if given an invalid amount, order type or symbol


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="closeOpenPositions"></a>

## closeOpenPositions(state) ⇒ <code>Promise</code>
Closes all open positions with market orders

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |

<a name="closePositionLimit"></a>

## closePositionLimit(state, orderParams) ⇒ <code>Promise</code>
Closes a position with a limit order

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="closePositionMarket"></a>

## closePositionMarket(state, orderParams) ⇒ <code>Promise</code>
Closes a position with a market order

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="closePositionWithOrder"></a>

## closePositionWithOrder(state, orderParams) ⇒ <code>Promise</code>
Closes an open position with an order. Throws an error if no position is open
for the order's symbol.

**Kind**: global function  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if no position is open for the symbol, if the provided
  order would not close the position, or if given invalid order parameters

**Todo**

- [ ] track historical positions


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="closePosition"></a>

## closePosition(state, orderParams) ⇒ <code>Promise</code>
Closes an open position with an order. Throws an error if no position is
open for the order's symbol.

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="createPositionObject"></a>

## createPositionObject(state, args) ⇒ [<code>StrategyPosition</code>](#StrategyPosition)
Creates a new/fresh position object, as used by the internal strategy state

**Kind**: global function  
**Returns**: [<code>StrategyPosition</code>](#StrategyPosition) - position - position  
**Throws**:

- <code>Error</code> fails if given an unknown symbol


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| args | [<code>PositionParameters</code>](#PositionParameters) | parameters |

<a name="openLongPositionLimit"></a>

## openLongPositionLimit(state, orderParams) ⇒ <code>Promise</code>
Opens a new long position with a limit order

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="openLongPositionMarket"></a>

## openLongPositionMarket(state, orderParams) ⇒ <code>Promise</code>
Opens a new long position with a market order

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="openLongPosition"></a>

## openLongPosition(state, orderParams) ⇒ <code>Promise</code>
Alias for openPositon

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="openPositionLimit"></a>

## openPositionLimit(state, orderParams) ⇒ <code>Promise</code>
Opens a new position with a limit order

**Kind**: global function  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if a position already exists for the specified symbol


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="openPositionMarket"></a>

## openPositionMarket(state, orderParams) ⇒ <code>Promise</code>
Opens a new position with a market order. Pulls order timestamp and price
from last received data for the order's symbol.

**Kind**: global function  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> If no timestamp or price data available and none supplied


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="openPositionWithOrder"></a>

## openPositionWithOrder(state, orderParams) ⇒ <code>Promise</code>
Submits a new order via ws2 with the supplied parameters, creates a new
strategy trade and creates a position.

If no ws client is available, no data is saved & no order is dispatched

**Kind**: global function  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if a position already exists for the specified symbol


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="openPosition"></a>

## openPosition(state, orderParams) ⇒ <code>Promise</code>
Opens a position with a new order; resolves to an error if a position is
already open.

**Kind**: global function  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if a position already exists for the specified symbol


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | passed directly to order constructor |

<a name="openShortPositionLimit"></a>

## openShortPositionLimit(state, orderParams) ⇒ <code>Promise</code>
Opens a short position (negates passed amount)

**Kind**: global function  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if a position already exists for the specified symbol


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="openShortPositionMarket"></a>

## openShortPositionMarket(state, orderParams) ⇒ <code>Promise</code>
Opens a short position (negates passed amount)

**Kind**: global function  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if a position already exists for the specified symbol


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="openShortPosition"></a>

## openShortPosition(state, orderParams) ⇒ <code>Promise</code>
Opens a short position (negates passed amount)

**Kind**: global function  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if a position already exists for the specified symbol


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="positionPL"></a>

## positionPL(state, [_symbol], [closePrice]) ⇒ <code>number</code>
Returns the P/L figure for the specified position, taking into account all
trades and optionally a close with the provided price.

**Kind**: global function  
**Returns**: <code>number</code> - pl  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| [_symbol] | <code>string</code> | defaults to default strat symbol |
| [closePrice] | <code>number</code> | used if position not already closed |

<a name="updateLongPositionLimit"></a>

## updateLongPositionLimit(state, orderParams) ⇒ <code>Promise</code>
Updates a long position with a limit order

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="updateLongPositionMarket"></a>

## updateLongPositionMarket(state, orderParams) ⇒ <code>Promise</code>
Updates a long position with a market order

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="updateLongPosition"></a>

## updateLongPosition(state, orderParams) ⇒ <code>Promise</code>
Updates a long position with an order.

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="updatePositionLimit"></a>

## updatePositionLimit(state, orderParams) ⇒ <code>Promise</code>
Updates a position with a limit order

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="updatePositionMarket"></a>

## updatePositionMarket(state, orderParams) ⇒ <code>Promise</code>
Updates a new position with a market order. Pulls order timestamp and price
from last received data for the order's symbol.

**Kind**: global function  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> If no timestamp or price data available and none supplied


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="updatePositionWithOrder"></a>

## updatePositionWithOrder(state, orderParams) ⇒ <code>Promise</code>
Submits a new order via ws2 with the supplied parameters, creates a new
strategy trade and updates the current position.

If no ws client is available, no data is saved & no order is dispatched

**Kind**: global function  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if no position is open for the symbol, if the order
  would close the position, or if given invalid order parameters


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="updatePosition"></a>

## updatePosition(state, orderParams) ⇒ <code>Promise</code>
Alias for updatePositionWithOrder

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | passed directly to order constructor |

<a name="updateShortPositionLimit"></a>

## updateShortPositionLimit(state, orderParams) ⇒ <code>Promise</code>
Updates a short position (negates passed amount)

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="updateShortPositionMarket"></a>

## updateShortPositionMarket(state, orderParams) ⇒ <code>Promise</code>
Updates a short position (negates passed amount)

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="updateShortPosition"></a>

## updateShortPosition(state, orderParams) ⇒ <code>Promise</code>
Updates a short position (negates passed amount)

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| orderParams | [<code>OrderParameters</code>](#OrderParameters) | order parameters |

<a name="onCandleUpdate"></a>

## onCandleUpdate(state, candle) ⇒ <code>Promise</code>
Called for an incoming candle update, for a candle previously passed to
onCandle() (same candle, new prices). Propagates the candle via onPriceUpdate

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| candle | <code>bfx-api-node-models.Candle</code> | candle |

<a name="onCandle"></a>

## onCandle(state, candle) ⇒ <code>Promise</code>
Called for an incoming (new) candle. Propagates the candle via onPriceUpdate

**Kind**: global function  
**Returns**: <code>Promise</code> - p  
**Throws**:

- <code>Error</code> Fails if no price is included on the candle, based on the
  configured candle key


| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| candle | <code>bfx-api-node-models.Candle</code> | candle |

<a name="onPriceUpdate"></a>

## onPriceUpdate(state, update) ⇒ <code>Promise</code>
Passes the incoming price update to the relevant strategy lifecycle methods.

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| update | <code>object</code> | incoming price update |

<a name="onSeedCandleUpdate"></a>

## onSeedCandleUpdate(state, candle)
Called for an incoming seed-period candle update, for a candle previously
passed to onSeedCandle() (same candle, new prices)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| candle | <code>bfx-api-node-models.Candle</code> | seed candle update |

<a name="onSeedCandle"></a>

## onSeedCandle(state, candle) ⇒ <code>Promise</code>
Called for an incoming (new) seed-period candle

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| candle | <code>bfx-api-node-models.Candle</code> | seed candle |

<a name="onSeedTrade"></a>

## onSeedTrade(state, trade)
Called for incoming seed-period trades.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| trade | <code>bfx-api-node-models.PublicTrade</code> | seed trade |

<a name="onTrade"></a>

## onTrade(state, trade) ⇒ <code>Promise</code>
Called for an incoming (new) trade. Propagates the trade via onPriceUpdate

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | strategy state |
| trade | <code>bfx-api-node-models.PublicTrade</code> | trade |

<a name="execInterruptableHandler"></a>

## execInterruptableHandler(handler, ...args)
Executes the provided handler while safely catching any ErrorInterruptExec
errors. Allows for interrupting handler execution early. Syntactical sugar.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | handler |
| ...args | <code>string</code> \| <code>number</code> \| <code>Array</code> \| <code>object</code> | passed directly to handler |

<a name="validateStrategy"></a>

## validateStrategy(state)
Validate a strategy instance

**Kind**: global function  
**Throws**:

- <code>Error</code> fails if given an invalid strategy instance

**See**: [StrategyState](#StrategyState)  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>StrategyState</code>](#StrategyState) | state to validate |

<a name="OrderParameters"></a>

## OrderParameters : <code>object</code>
Parameters defining an atomic order

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [id] | <code>number</code> | ID |
| [gid] | <code>number</code> | group ID |
| [cid] | <code>number</code> | client ID |
| [mtsTIF] | <code>number</code> | TIF timestamp |
| [flags] | <code>number</code> | order flags |
| [tag] | <code>string</code> | string rendered in execution results, and   attached to the trade associated with the order. used for specifying meta   information about the order i.e. event that triggered it. Identical tags   are grouped together in execution results |
| [label] | <code>string</code> | rendered in the Bitfinex UI |
| price | <code>number</code> | desired excution price, required even for   `MARKET` orders in order to have a fill price when backtesting. |
| [priceTrailing] | <code>string</code> | trailing distance for TRAILING STOP   orders |
| [priceAuxLimit] | <code>string</code> | stop price for STOP LIMIT and OCO   orders |
| amount | <code>number</code> | order amount |
| [type] | <code>string</code> | i.e. stop, stop-limit. May be required if using   an order creation method that does not set it |
| [affiliateCode] | <code>string</code> | affiliate code |
| [lev] | <code>number</code> | leverage |

<a name="PositionParameters"></a>

## PositionParameters
Parameters used to create a new position

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| price | <code>number</code> | price |
| symbol | <code>string</code> | symbol |
| amount | <code>number</code> | amount |
| [trades] | <code>Array.&lt;object&gt;</code> | trades that affected the position |
| [tag] | <code>string</code> | position label, visible in results output |

<a name="StrategyDefinition"></a>

## StrategyDefinition : <code>object</code>
A set of parameters defining a trading strategy. Can be passed to
[defineStrategy](#defineStrategy) to obtain a [StrategyState](#StrategyState) object which can
then be used with either [bfx-hf-backtest](https://github.com/bitfinexcom/bfx-hf-backtest) for backtesting on
historical data, or [bfx-hf-strategy-exec](https://github.com/bitfinexcom/bfx-hf-strategy-exec) for live
execution.

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | strategy ID |
| name | <code>string</code> |  | strategy name (human readable) |
| makerFee | <code>number</code> |  | maker fee as percent |
| takerFee | <code>number</code> |  | taker fee as percent |
| [simulateLiveCandleEnabled] | <code>boolean</code> | <code>false</code> | if true, generates   random trades for each candle |
| [plugins] | <code>Array.&lt;object&gt;</code> |  | array of plugins |
| [margin] | <code>boolean</code> |  | if true, trades on margin, otherwise exchange |
| [symbol] | <code>string</code> |  | default symbol for data/trades |
| [tf] | <code>string</code> |  | default candle time frame |
| [candlePrice] | <code>string</code> | <code>&quot;&#x27;close&#x27;&quot;</code> | key to access on candle for price |
| [indicators] | <code>object</code> |  | managed indicators map |
| exec | <code>function</code> |  | strategy logic, called on every price update |

<a name="StrategyPosition"></a>

## StrategyPosition : <code>object</code>
An object representing a strategy position in a market, including all
relevant [trades](#StrategyTrade).

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| symbol | <code>string</code> | symbol |
| price | <code>number</code> | current base price |
| amount | <code>number</code> | total position amount |
| trades | [<code>Array.&lt;StrategyTrade&gt;</code>](#StrategyTrade) | all trades relevant to this position,   in order of execution. |
| [tag] | <code>string</code> | metadata accessible at runtime |

<a name="StrategyState"></a>

## StrategyState
Strategy state updated throughout the lifetime of a strategy, used for both
backtesting and live execution. The core of this library.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | strategy ID |
| name | <code>string</code> | strategy name (human readable) |
| makerFee | <code>number</code> | maker fee |
| takerFee | <code>number</code> | taker fee |
| marketData | <code>object</code> | internal map of market data, trades and  candles |
| positions | <code>object</code> | internal map of positions key'ed by symbol |
| trades | <code>Array.&lt;object&gt;</code> | array of trades performed by the strategy |
| exec | <code>function</code> | strategy execution logic |
| [plugins] | <code>Array.&lt;object&gt;</code> | array of plugins |
| [margin] | <code>boolean</code> | if true, trades on margin, otherwise exchange |
| [symbol] | <code>string</code> | default symbol for data/trades |
| [tf] | <code>string</code> | default candle time frame |
| [indicators] | <code>object</code> | managed indicators map |
| [helpers] | <code>bfx-hf-strategy/RuntimeHelpers</code> | helpers module   bound to this strategy instance |
| [candlePrice] | <code>string</code> | key on candle from which to pull price,   used for updating indicators. Defaults to 'close' |

<a name="StrategyTrade"></a>

## StrategyTrade
A trade performed by a strategy

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| symbol | <code>string</code> | symbol |
| label | <code>string</code> | informative label shown in generated strategy   results |
| tag | <code>string</code> | like label, but meant to be used internally for   identifying the nature of the trade (i.e. 'rsi-high', etc) |
| amount | <code>number</code> | amount |
| price | <code>number</code> | price |
| pl | <code>number</code> | profit/loss relative to prior trades made on the   same symbol |
| mts | <code>number</code> | creation timestamp |
| mtsCreate | <code>number</code> | order creation timestamp |
| orderID | <code>number</code> | ID of the trade's order |
| orderPrice | <code>number</code> | price of the trade's order |
| orderStatus | <code>string</code> | status of the trade's order |
| orderJS | <code>object</code> | POJO of the trade's order |
| maker | <code>boolean</code> | true if the trade inserted an order into the   book |
| fee | <code>number</code> | fee amount |
| feeCCY | <code>string</code> | fee currency |
| positionID | <code>string</code> | ID of position the trade affected, if any |
| iv | <code>object</code> | indicator values at the moment the trade was created |

