## Functions

<dl>
<dt><a href="#defineStrategy">defineStrategy(args)</a> ⇒ <code>Object</code></dt>
<dd><p>Returns an initial strategy state object for the provided arguments. The
state object can then be used with the various HF strategy methods.</p>
</dd>
<dt><a href="#getCandle">getCandle(state, n, symbol, tf)</a> ⇒ <code>Object</code></dt>
<dd><p>Reverses candle sort, n = 0 for most recent candle</p>
</dd>
<dt><a href="#getCandles">getCandles(state, forSymbol, forTF)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#getDefaultCandles">getDefaultCandles(state)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Returns the candle dataset for the default symbol/tf pair</p>
</dd>
<dt><a href="#getDefaultSymbol">getDefaultSymbol(strategyState)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the default symbol for the strategy; a strategy can have either a
set of multiple symbols, a single default &#39;symbol&#39; defined, or both.</p>
</dd>
<dt><a href="#getDefaultTF">getDefaultTF(strategyState)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the default time frame for the strategy; a strategy can have either a
set of multiple time frames, a single default time frame, or both.</p>
</dd>
<dt><a href="#getDefaultTrades">getDefaultTrades(state)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Returns the trade dataset for the default symbol</p>
</dd>
<dt><a href="#getLastPrice">getLastPrice(state, symbol, tf)</a> ⇒ <code>Object</code></dt>
<dd><p>Get the last price &amp; timestamp received for the specified symbol &amp; tf.</p>
</dd>
<dt><a href="#getNumCandles">getNumCandles(state, symbol, tf)</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#getNumTrades">getNumTrades(state, symbol)</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#getPosition">getPosition(state, forSymbol)</a> ⇒ <code>Object</code></dt>
<dd><p>Returns the position for the specified symbol</p>
</dd>
<dt><a href="#getTrade">getTrade(state, n, symbol, tf)</a> ⇒ <code>Object</code></dt>
<dd><p>Reverses trade sort, n = 0 for most recent trade</p>
</dd>
<dt><a href="#getTrades">getTrades(state, symbol)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Returns all known trades for the specified symbol</p>
</dd>
<dt><a href="#isLong">isLong(state, symbol)</a> ⇒ <code>boolean</code></dt>
<dd><p>Queries if a long position is open for the specified symbol</p>
</dd>
<dt><a href="#isShort">isShort(state, symbol)</a> ⇒ <code>boolean</code></dt>
<dd><p>Queries if a short position is open for the specified symbol</p>
</dd>
<dt><a href="#addIndicatorData">addIndicatorData(state, type, update, f)</a></dt>
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
<dt><a href="#indicatorsExec">indicatorsExec(strategyState, fn)</a> ⇒ <code>Object</code></dt>
<dd><p>Executes the specified function in all strategy indicators, and returns the
results in a map matching the indicator map structure.</p>
</dd>
<dt><a href="#indicators">indicators(strategyState)</a> ⇒ <code>Object</code></dt>
<dd><p>Strategy indicators selector</p>
</dd>
<dt><a href="#indicatorsReady">indicatorsReady(state)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if all indicators have been marked as ready (seed period fulfilled)</p>
</dd>
<dt><a href="#indicatorValues">indicatorValues(strategyState)</a> ⇒ <code>Object</code></dt>
<dd><p>Returns a map of all indicator values for the provided strategy</p>
</dd>
<dt><a href="#logTrades">logTrades(strategyState)</a></dt>
<dd><p>Returns a map of all indicator values for the provided strategy</p>
</dd>
<dt><a href="#resetIndicators">resetIndicators(state)</a></dt>
<dd><p>Resets all of the strategy&#39;s indicators</p>
</dd>
<dt><a href="#seedPeriodForIndicators">seedPeriodForIndicators(state)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the minimum seed period required for the strategy</p>
</dd>
<dt><a href="#updateIndicatorData">updateIndicatorData(state, type, update, f)</a></dt>
<dd></dd>
<dt><a href="#calculateFees">calculateFees(state, order, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Calculates feed for a specific order.</p>
</dd>
<dt><a href="#calcRealizedTradePnl">calcRealizedTradePnl(state, trade)</a> ⇒ <code>number</code></dt>
<dd><p>Calculates and returns realized P/L figure for a specific trade, taking into account all
trades</p>
</dd>
<dt><a href="#calcRealizedPositionPnl">calcRealizedPositionPnl(state, position, currentPrice)</a> ⇒ <code>number</code></dt>
<dd><p>Calculates and returns realized P/L figure for a specific position</p>
</dd>
<dt><a href="#calcUnrealizedPositionPnl">calcUnrealizedPositionPnl(state, position, currentPrice)</a> ⇒ <code>number</code></dt>
<dd><p>Calculates and returns unrealized P/L figure for a specific position</p>
</dd>
<dt><a href="#calcRealizedStrategyPnl">calcRealizedStrategyPnl(strategyState)</a> ⇒ <code>number</code></dt>
<dd><p>Calculates and returns realized P/L figure for the strategy</p>
</dd>
<dt><a href="#calcUnrealizedStrategyPnl">calcUnrealizedStrategyPnl(strategyState)</a> ⇒ <code>number</code></dt>
<dd><p>Calculates and returns unrealized P/L figure for the strategy</p>
</dd>
<dt><a href="#closeOpenPositions">closeOpenPositions(state)</a> ⇒ <code>Promise</code></dt>
<dd><p>Closes all open positions with market orders</p>
</dd>
<dt><a href="#closePosition">closePosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Closes an open position with an order. Throws an error if no position is open
for the order&#39;s symbol.</p>
</dd>
<dt><a href="#closePendingOrders">closePendingOrders(state)</a> ⇒ <code>Promise</code></dt>
<dd><p>Closes all open positions with market orders.</p>
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
<dt><a href="#openLongPosition">openLongPosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Alias for openPositon</p>
</dd>
<dt><a href="#openLongPositionLimit">openLongPositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a new long position with a limit order</p>
</dd>
<dt><a href="#openLongPositionMarket">openLongPositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a new long position with a market order</p>
</dd>
<dt><a href="#openPosition">openPosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a position with a new order; resolves to an error if a position is
already open.</p>
</dd>
<dt><a href="#openPositionLimit">openPositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a new position with a limit order</p>
</dd>
<dt><a href="#openPositionMarket">openPositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a new position with a market order</p>
</dd>
<dt><a href="#openPositionWithOrder">openPositionWithOrder(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Submits a new order via ws2 with the supplied parameters, creates a new
strategy trade and creates a position.</p>
<p>If no ws client is available, no data is saved &amp; no order is dispatched</p>
</dd>
<dt><a href="#openShortPosition">openShortPosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a short position (negates passed amount)</p>
</dd>
<dt><a href="#openShortPositionLimit">openShortPositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a short position (negates passed amount)</p>
</dd>
<dt><a href="#openShortPositionMarket">openShortPositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Opens a short position (negates passed amount)</p>
</dd>
<dt><a href="#updateLongPosition">updateLongPosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#updateLongPositionLimit">updateLongPositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a long position with a limit order</p>
</dd>
<dt><a href="#updateLongPositionMarket">updateLongPositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a long position with a market order</p>
</dd>
<dt><a href="#updatePosition">updatePosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Alias for updatePositionWithOrder</p>
</dd>
<dt><a href="#updatePositionLimit">updatePositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a position with a limit order</p>
</dd>
<dt><a href="#updatePositionMarket">updatePositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a new position with a market order</p>
</dd>
<dt><a href="#updatePositionWithOrder">updatePositionWithOrder(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Submits a new order via ws2 with the supplied parameters, creates a new
strategy trade and updates the current position.</p>
<p>If no ws client is available, no data is saved &amp; no order is dispatched</p>
</dd>
<dt><a href="#updatePositionWithTrade">updatePositionWithTrade(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates the current position with the supplied trade.</p>
</dd>
<dt><a href="#updateShortPosition">updateShortPosition(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a short position (negates passed amount)</p>
</dd>
<dt><a href="#updateShortPositionLimit">updateShortPositionLimit(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a short position (negates passed amount)</p>
</dd>
<dt><a href="#updateShortPositionMarket">updateShortPositionMarket(state, orderParams)</a> ⇒ <code>Promise</code></dt>
<dd><p>Updates a short position (negates passed amount)</p>
</dd>
<dt><a href="#onCandle">onCandle(state, candle)</a> ⇒ <code>Promise</code></dt>
<dd><p>Called for an incoming (new) candle. Propagates the candle via onPriceUpdate</p>
</dd>
<dt><a href="#onCandleUpdate">onCandleUpdate(state, candle)</a> ⇒ <code>Promise</code></dt>
<dd><p>Called for an incoming candle update, for a candle previously passed to
onCandle() (same candle, new prices). Propagates the candle via onPriceUpdate</p>
</dd>
<dt><a href="#onPriceUpdate">onPriceUpdate(state, update)</a> ⇒ <code>Promise</code></dt>
<dd><p>Passes the incoming price update to the relevant strategy lifecycle methods:</p>
<p>onPriceUpdate - always called
onEnter - called if no position is open
onUpdateShort - called if a short position is open
onUpdateLong - called if a long position is open
onUpdateClosing - called if a position is open but currently closing
onUpdate - called if a position is open</p>
<p>Returns the resulting strategy state</p>
</dd>
<dt><a href="#onSeedCandle">onSeedCandle(state, candle)</a> ⇒ <code>Promise</code></dt>
<dd><p>Called for an incoming (new) seed-period candle</p>
</dd>
<dt><a href="#onSeedCandleUpdate">onSeedCandleUpdate(state, candle)</a> ⇒ <code>Promise</code></dt>
<dd><p>Called for an incoming seed-period candle update, for a candle previously
passed to onSeedCandle() (same candle, new prices)</p>
</dd>
<dt><a href="#onSeedTrade">onSeedTrade(state, trade)</a> ⇒ <code>Promise</code></dt>
<dd><p>Called for incoming seed-period trades.</p>
</dd>
<dt><a href="#onTrade">onTrade(state, candle)</a> ⇒ <code>Promise</code></dt>
<dd><p>Called for an incoming (new) trade. Propagates the trade via onPriceUpdate</p>
</dd>
</dl>

<a name="defineStrategy"></a>

## defineStrategy(args) ⇒ <code>Object</code>
Returns an initial strategy state object for the provided arguments. The
state object can then be used with the various HF strategy methods.

**Kind**: global function  
**Returns**: <code>Object</code> - state - initial strategy state  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> |  |
| args.id | <code>string</code> | strategy ID |
| args.name | <code>string</code> | strategy name (human readable) |
| args.margin | <code>boolean</code> | if true, trades on margin, otherwise exchange |
| args.symbol | <code>string</code> | default symbol for data/trades |
| args.tf | <code>string</code> | default candle time frame |
| args.candlePrice | <code>string</code> | key to access on candle for price (defaults to close) |
| args.indicators | <code>Object</code> | managed indicators map |
| args.onPriceUpdate | <code>Method</code> |  |
| args.onEnter | <code>Method</code> |  |
| args.onUpdate | <code>Method</code> |  |
| args.onUpdateLong | <code>Method</code> |  |
| args.onUpdateShort | <code>Method</code> |  |
| args.onUpdateClosing | <code>Method</code> |  |
| args.onPositionOpen | <code>Method</code> |  |
| args.onPositionUpdate | <code>Method</code> |  |
| args.onPositionClose | <code>Method</code> |  |
| args.onStart | <code>Method</code> |  |
| args.onStop | <code>Method</code> |  |

<a name="getCandle"></a>

## getCandle(state, n, symbol, tf) ⇒ <code>Object</code>
Reverses candle sort, n = 0 for most recent candle

**Kind**: global function  
**Returns**: <code>Object</code> - candle  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| state | <code>Object</code> |  |  |
| n | <code>number</code> | <code>0</code> | index |
| symbol | <code>string</code> |  |  |
| tf | <code>string</code> |  |  |

<a name="getCandles"></a>

## getCandles(state, forSymbol, forTF) ⇒ <code>Array.&lt;Object&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - candles - sorted oldest first  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| forSymbol | <code>string</code> | defaults to strategy symbol |
| forTF | <code>string</code> | defaults to strategy tf |

<a name="getDefaultCandles"></a>

## getDefaultCandles(state) ⇒ <code>Array.&lt;Object&gt;</code>
Returns the candle dataset for the default symbol/tf pair

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - candles  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 

<a name="getDefaultSymbol"></a>

## getDefaultSymbol(strategyState) ⇒ <code>string</code>
Returns the default symbol for the strategy; a strategy can have either a
set of multiple symbols, a single default 'symbol' defined, or both.

**Kind**: global function  
**Returns**: <code>string</code> - defaultSymbol  

| Param | Type |
| --- | --- |
| strategyState | <code>Object</code> | 

<a name="getDefaultTF"></a>

## getDefaultTF(strategyState) ⇒ <code>string</code>
Returns the default time frame for the strategy; a strategy can have either a
set of multiple time frames, a single default time frame, or both.

**Kind**: global function  
**Returns**: <code>string</code> - defaultTF  

| Param | Type |
| --- | --- |
| strategyState | <code>Object</code> | 

<a name="getDefaultTrades"></a>

## getDefaultTrades(state) ⇒ <code>Array.&lt;Object&gt;</code>
Returns the trade dataset for the default symbol

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - trades  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 

<a name="getLastPrice"></a>

## getLastPrice(state, symbol, tf) ⇒ <code>Object</code>
Get the last price & timestamp received for the specified symbol & tf.

**Kind**: global function  
**Returns**: <code>Object</code> - pp - price point, { mts, price } (null if unavailable)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| symbol | <code>string</code> | optional, defaults to strategy symbol |
| tf | <code>string</code> | optional, defaults to strategy tf |

<a name="getNumCandles"></a>

## getNumCandles(state, symbol, tf) ⇒ <code>number</code>
**Kind**: global function  
**Returns**: <code>number</code> - numCandles  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| symbol | <code>string</code> | defaults to strategy symbol |
| tf | <code>string</code> | defaults to strategy time frame |

<a name="getNumTrades"></a>

## getNumTrades(state, symbol) ⇒ <code>number</code>
**Kind**: global function  
**Returns**: <code>number</code> - numTrades  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| symbol | <code>string</code> | defaults to strategy symbol |

<a name="getPosition"></a>

## getPosition(state, forSymbol) ⇒ <code>Object</code>
Returns the position for the specified symbol

**Kind**: global function  
**Returns**: <code>Object</code> - position - may be null  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| forSymbol | <code>string</code> | optional, defaults to strategy symbol |

<a name="getTrade"></a>

## getTrade(state, n, symbol, tf) ⇒ <code>Object</code>
Reverses trade sort, n = 0 for most recent trade

**Kind**: global function  
**Returns**: <code>Object</code> - trade  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| state | <code>Object</code> |  |  |
| n | <code>number</code> | <code>0</code> | index |
| symbol | <code>string</code> |  |  |
| tf | <code>string</code> |  |  |

<a name="getTrades"></a>

## getTrades(state, symbol) ⇒ <code>Array.&lt;Object&gt;</code>
Returns all known trades for the specified symbol

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - trades - sorted oldest first  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| state | <code>Object</code> |  |  |
| symbol | <code>string</code> | <code>null</code> | defaults to strategy symbol |

<a name="isLong"></a>

## isLong(state, symbol) ⇒ <code>boolean</code>
Queries if a long position is open for the specified symbol

**Kind**: global function  
**Returns**: <code>boolean</code> - isLong  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| symbol | <code>string</code> | optional, defaults to strategy symbol |

<a name="isShort"></a>

## isShort(state, symbol) ⇒ <code>boolean</code>
Queries if a short position is open for the specified symbol

**Kind**: global function  
**Returns**: <code>boolean</code> - isShort  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| symbol | <code>string</code> | optional, defaults to strategy symbol |

<a name="addIndicatorData"></a>

## addIndicatorData(state, type, update, f)
Adds the provided data update packet to all strategy indicators matching the
update type.

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| type | <code>string</code> | 
| update | <code>Object</code> | 
| f | <code>function</code> | 

<a name="findIndicator"></a>

## findIndicator(state, f) ⇒ <code>Indicator</code>
Returns the first indicator in the strategy for which the provided function
evaluates to true.

**Kind**: global function  
**Returns**: <code>Indicator</code> - i - null if not found  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | strategy state |
| f | <code>function</code> | called with (indicator, id) |

<a name="forEachIndicator"></a>

## forEachIndicator(state, f)
Calls the provided function with each indicator on the strategy.

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| f | <code>function</code> | 

<a name="indicatorsExec"></a>

## indicatorsExec(strategyState, fn) ⇒ <code>Object</code>
Executes the specified function in all strategy indicators, and returns the
results in a map matching the indicator map structure.

**Kind**: global function  
**Returns**: <code>Object</code> - results  

| Param | Type | Description |
| --- | --- | --- |
| strategyState | <code>Object</code> |  |
| fn | <code>string</code> | function name |

<a name="indicators"></a>

## indicators(strategyState) ⇒ <code>Object</code>
Strategy indicators selector

**Kind**: global function  
**Returns**: <code>Object</code> - indicators  

| Param | Type |
| --- | --- |
| strategyState | <code>Object</code> | 

<a name="indicatorsReady"></a>

## indicatorsReady(state) ⇒ <code>boolean</code>
Checks if all indicators have been marked as ready (seed period fulfilled)

**Kind**: global function  
**Returns**: <code>boolean</code> - ready - true if all indicators are ready  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 

<a name="indicatorValues"></a>

## indicatorValues(strategyState) ⇒ <code>Object</code>
Returns a map of all indicator values for the provided strategy

**Kind**: global function  
**Returns**: <code>Object</code> - iv  

| Param | Type |
| --- | --- |
| strategyState | <code>Object</code> | 

<a name="logTrades"></a>

## logTrades(strategyState)
Log all trades for the strategy

**Kind**: global function

| Param | Type |
| --- | --- |
| strategyState | <code>Object</code> | 

<a name="resetIndicators"></a>

## resetIndicators(state)
Resets all of the strategy's indicators

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | strategy state |

<a name="seedPeriodForIndicators"></a>

## seedPeriodForIndicators(state) ⇒ <code>number</code>
Returns the minimum seed period required for the strategy

**Kind**: global function  
**Returns**: <code>number</code> - seedPeriod  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 

<a name="updateIndicatorData"></a>

## updateIndicatorData(state, type, update, f)
**Kind**: global function  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| type | <code>string</code> | 
| update | <code>Object</code> \| <code>number</code> | 
| f | <code>function</code> | 

<a name="calculateFees"></a>

## calculateFees(state, order, orderParams) ⇒ <code>Promise</code>
Calculates feed for a specific order.

**Kind**: global function
**Returns**: <code>Promise</code> - Object<{ amount: BigNumber, cost: BigNumber, currency: string, perc: BigNumber, isMaker: boolean }>

| Param | Type |
| --- | --- |
| state | <code>Object</code> |
| order | <code>Object</code> |
| orderParams | <code>Object</code> |

<a name="calcRealizedTradePnl"></a>

## calcRealizedTradePnl(state, trade) ⇒ <code>number</code>
**Kind**: global function
**Returns**: <code>number</code> - tradePnl

| Param | Type |
| --- | --- |
| state | <code>Object</code> |
| trade | <code>Trade</code> |

<a name="calcRealizedPositionPnl"></a>

## calcRealizedPositionPnl(state, position, currentPrice) ⇒ <code>number</code>
**Kind**: global function
**Returns**: <code>number</code> - positionPnl

| Param | Type |
| --- | --- |
| state | <code>Object</code> |
| position | <code>Object</code> |
| currentPrice | <code>number</code> |

<a name="calcUnrealizedPositionPnl"></a>

## calcUnrealizedPositionPnl(state, position, currentPrice) ⇒ <code>number</code>
**Kind**: global function
**Returns**: <code>number</code> - tradePnl

| Param | Type |
| --- | --- |
| state | <code>Object</code> |
| position | <code>Object</code> |
| currentPrice | <code>number</code> |

<a name="calcRealizedStrategyPnl"></a>

## calcRealizedStrategyPnl(strategyState) ⇒ <code>number</code>
**Kind**: global function
**Returns**: <code>number</code> - strategyPnl

| Param | Type |
| --- | --- |
| strategyState | <code>Object</code> | 

<a name="calcUnrealizedStrategyPnl"></a>

## calcUnrealizedStrategyPnl(strategyState) ⇒ <code>number</code>
**Kind**: global function
**Returns**: <code>number</code> - strategyPnl

| Param | Type |
| --- | --- |
| strategyState | <code>Object</code> | 

<a name="closeOpenPositions"></a>

## closeOpenPositions(state) ⇒ <code>Promise</code>
Closes all open positions with market orders

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 

<a name="closePosition"></a>

## closePosition(state, orderParams) ⇒ <code>Promise</code>
Closes an open position with an order. Throws an error if no position is open
for the order's symbol.

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="closePendingOrders"></a>

## closePendingOrders(state) ⇒ <code>Promise</code>
Closes all open positions with market orders.

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> |

<a name="closePositionLimit"></a>

## closePositionLimit(state, orderParams) ⇒ <code>Promise</code>
Closes a position with a limit order

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="closePositionMarket"></a>

## closePositionMarket(state, orderParams) ⇒ <code>Promise</code>
Closes a position with a market order

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="closePositionWithOrder"></a>

## closePositionWithOrder(state, orderParams) ⇒ <code>Promise</code>
Closes an open position with an order. Throws an error if no position is open
for the order's symbol.

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="openLongPosition"></a>

## openLongPosition(state, orderParams) ⇒ <code>Promise</code>
Alias for openPositon

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="openLongPositionLimit"></a>

## openLongPositionLimit(state, orderParams) ⇒ <code>Promise</code>
Opens a new long position with a limit order

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="openLongPositionMarket"></a>

## openLongPositionMarket(state, orderParams) ⇒ <code>Promise</code>
Opens a new long position with a market order

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="openPosition"></a>

## openPosition(state, orderParams) ⇒ <code>Promise</code>
Opens a position with a new order; resolves to an error if a position is
already open.

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| orderParams | <code>Object</code> | passed directly to order constructor |

<a name="openPositionLimit"></a>

## openPositionLimit(state, orderParams) ⇒ <code>Promise</code>
Opens a new position with a limit order

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="openPositionMarket"></a>

## openPositionMarket(state, orderParams) ⇒ <code>Promise</code>
Opens a new position with a market order

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="openPositionWithOrder"></a>

## openPositionWithOrder(state, orderParams) ⇒ <code>Promise</code>
Submits a new order via ws2 with the supplied parameters, creates a new
strategy trade and creates a position.

If no ws client is available, no data is saved & no order is dispatched

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 
| orderParams.symbol | <code>string</code> | 
| orderParams.type | <code>string</code> | 
| orderParams.amount | <code>number</code> | 

<a name="openShortPosition"></a>

## openShortPosition(state, orderParams) ⇒ <code>Promise</code>
Opens a short position (negates passed amount)

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| orderParams | <code>Object</code> |  |
| orderParams.amount | <code>number</code> | required |

<a name="openShortPositionLimit"></a>

## openShortPositionLimit(state, orderParams) ⇒ <code>Promise</code>
Opens a short position (negates passed amount)

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| orderParams | <code>Object</code> |  |
| orderParams.amount | <code>number</code> | required |

<a name="openShortPositionMarket"></a>

## openShortPositionMarket(state, orderParams) ⇒ <code>Promise</code>
Opens a short position (negates passed amount)

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| orderParams | <code>Object</code> |  |
| orderParams.amount | <code>number</code> | required |

<a name="updateLongPosition"></a>

## updateLongPosition(state, orderParams) ⇒ <code>Promise</code>
**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="updateLongPositionLimit"></a>

## updateLongPositionLimit(state, orderParams) ⇒ <code>Promise</code>
Updates a long position with a limit order

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="updateLongPositionMarket"></a>

## updateLongPositionMarket(state, orderParams) ⇒ <code>Promise</code>
Updates a long position with a market order

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="updatePosition"></a>

## updatePosition(state, orderParams) ⇒ <code>Promise</code>
Alias for updatePositionWithOrder

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| orderParams | <code>Object</code> | passed directly to order constructor |

<a name="updatePositionLimit"></a>

## updatePositionLimit(state, orderParams) ⇒ <code>Promise</code>
Updates a position with a limit order

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="updatePositionMarket"></a>

## updatePositionMarket(state, orderParams) ⇒ <code>Promise</code>
Updates a new position with a market order

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 

<a name="updatePositionWithOrder"></a>

## updatePositionWithOrder(state, orderParams) ⇒ <code>Promise</code>
Submits a new order via ws2 with the supplied parameters, creates a new
strategy trade and updates the current position.

If no ws client is available, no data is saved & no order is dispatched

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| orderParams | <code>Object</code> | 
| orderParams.symbol | <code>string</code> | 
| orderParams.type | <code>string</code> | 
| orderParams.amount | <code>number</code> | 

<a name="updatePositionWithTrade"></a>

## updatePositionWithTrade(state, trade) ⇒ <code>object</code>
Updates the current position with the supplied trade

**Kind**: global function  
**Returns**: <code>object</code> - position - updated position object

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| trade | <code>Object</code> |

<a name="updateShortPosition"></a>

## updateShortPosition(state, orderParams) ⇒ <code>Promise</code>
Updates a short position (negates passed amount)

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| orderParams | <code>Object</code> |  |
| orderParams.amount | <code>number</code> | required |

<a name="updateShortPositionLimit"></a>

## updateShortPositionLimit(state, orderParams) ⇒ <code>Promise</code>
Updates a short position (negates passed amount)

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| orderParams | <code>Object</code> |  |
| orderParams.amount | <code>number</code> | required |

<a name="updateShortPositionMarket"></a>

## updateShortPositionMarket(state, orderParams) ⇒ <code>Promise</code>
Updates a short position (negates passed amount)

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| orderParams | <code>Object</code> |  |
| orderParams.amount | <code>number</code> | required |

<a name="onCandle"></a>

## onCandle(state, candle) ⇒ <code>Promise</code>
Called for an incoming (new) candle. Propagates the candle via onPriceUpdate

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| candle | <code>Candle</code> | 

<a name="onCandleUpdate"></a>

## onCandleUpdate(state, candle) ⇒ <code>Promise</code>
Called for an incoming candle update, for a candle previously passed to
onCandle() (same candle, new prices). Propagates the candle via onPriceUpdate

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| candle | <code>Candle</code> | 

<a name="onPriceUpdate"></a>

## onPriceUpdate(state, update) ⇒ <code>Promise</code>
Passes the incoming price update to the relevant strategy lifecycle methods:

onPriceUpdate - always called
onEnter - called if no position is open
onUpdateShort - called if a short position is open
onUpdateLong - called if a long position is open
onUpdateClosing - called if a position is open but currently closing
onUpdate - called if a position is open

Returns the resulting strategy state

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> |  |
| update | <code>Object</code> | incoming price update |

<a name="onSeedCandle"></a>

## onSeedCandle(state, candle) ⇒ <code>Promise</code>
Called for an incoming (new) seed-period candle

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| candle | <code>Candle</code> | 

<a name="onSeedCandleUpdate"></a>

## onSeedCandleUpdate(state, candle) ⇒ <code>Promise</code>
Called for an incoming seed-period candle update, for a candle previously
passed to onSeedCandle() (same candle, new prices)

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| candle | <code>Candle</code> | 

<a name="onSeedTrade"></a>

## onSeedTrade(state, trade) ⇒ <code>Promise</code>
Called for incoming seed-period trades.

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| trade | <code>Trade</code> | 

<a name="onTrade"></a>

## onTrade(state, candle) ⇒ <code>Promise</code>
Called for an incoming (new) trade. Propagates the trade via onPriceUpdate

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to nextState  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| candle | <code>Candle</code> | 

