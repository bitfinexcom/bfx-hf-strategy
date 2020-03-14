## Bitfinex Honey Framework Trading Strategy Library for Node.JS

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

### Tutorials

Refer to the following tutorials for an overview of the strategy and backtesting systems:

* {@tutorial Architectural Overview}
* {@tutorial Backtesting Offline}
* {@tutorial Backtesting Online}
* {@tutorial Live Execution}
* {@tutorial Order Creation}
* {@tutorial Strategy Design}
* {@tutorial Using Indicators}

### Examples

For ready to run examples, see the [/examples](/examples) folder.
