## Modules

<dl>
<dt><a href="#module_bfx-hf-strategy/RuntimeHelpers">bfx-hf-strategy/RuntimeHelpers</a></dt>
<dd><p>A set of utility functions bound to the strategy they are used in, providing
control over strategy execution, access to data, and order manipulation
methods.</p>
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
<a href="defineStrategy">defineStrategy</a> to obtain a <a href="#StrategyState">StrategyState</a> object which can
then be used with either <a href="external:bfx-hf-backtest">external:bfx-hf-backtest</a> for backtesting on
historical data, or <a href="external:bfx-hf-strategy-exec">external:bfx-hf-strategy-exec</a> for live
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
[defineStrategy](defineStrategy) to obtain a [StrategyState](#StrategyState) object which can
then be used with either [external:bfx-hf-backtest](external:bfx-hf-backtest) for backtesting on
historical data, or [external:bfx-hf-strategy-exec](external:bfx-hf-strategy-exec) for live
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
| [candlePrice] | <code>string</code> | key on candle from which to pull price,   used for updating indicators. Defaults to 'close' |
| marketData | <code>object</code> | internal map of market data, trades and  candles |
| positions | <code>object</code> | internal map of positions key'ed by symbol |
| trades | <code>Array.&lt;object&gt;</code> | array of trades performed by the strategy |
| [plugins] | <code>Array.&lt;object&gt;</code> | array of plugins |
| [margin] | <code>boolean</code> | if true, trades on margin, otherwise exchange |
| [symbol] | <code>string</code> | default symbol for data/trades |
| [tf] | <code>string</code> | default candle time frame |
| [indicators] | <code>object</code> | managed indicators map |
| [onPriceUpdate] | <code>function</code> | called on every price update |
| [onEnter] | <code>function</code> | called when a position is opened |
| [onUpdate] | <code>function</code> | called on every price update if a   position is open |
| [onUpdateLong] | <code>function</code> | called if a long position is open |
| [onUpdateShort] | <code>function</code> | called if a short position is open   closed |
| [onPositionOpen] | <code>function</code> | called when a position is opened |
| [onPositionUpdate] | <code>function</code> | called when a position is updated |
| [onPositionClose] | <code>function</code> | called when a position is closed |
| [onStart] | <code>function</code> | called on strategy execution start |
| [onStop] | <code>function</code> | called on strategy execution end |

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

