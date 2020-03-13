// @create-index

const addCandleData = require('./add_candle_data.js')
const addTradeData = require('./add_trade_data.js')
const candleMarketDataKey = require('./candle_market_data_key.js')
const getCandle = require('./get_candle.js')
const getCandles = require('./get_candles.js')
const getDefaultCandles = require('./get_default_candles.js')
const getDefaultSymbol = require('./get_default_symbol.js')
const getDefaultTf = require('./get_default_tf.js')
const getDefaultTrades = require('./get_default_trades.js')
const getLastPrice = require('./get_last_price.js')
const getNumCandles = require('./get_num_candles.js')
const getNumTrades = require('./get_num_trades.js')
const getPosition = require('./get_position.js')
const getTrade = require('./get_trade.js')
const getTrades = require('./get_trades.js')
const isLong = require('./is_long.js')
const isShort = require('./is_short.js')
const positionPl = require('./position_pl.js')
const tradeMarketDataKey = require('./trade_market_data_key.js')
const updatePositionWithTrade = require('./update_position_with_trade.js')

/**
  * Strategy data manipulation methods
  *
  * @module Data
  */
module.exports = {
  addCandleData,
  addTradeData,
  candleMarketDataKey,
  getCandle,
  getCandles,
  getDefaultCandles,
  getDefaultSymbol,
  getDefaultTf,
  getDefaultTrades,
  getLastPrice,
  getNumCandles,
  getNumTrades,
  getPosition,
  getTrade,
  getTrades,
  isLong,
  isShort,
  positionPl,
  tradeMarketDataKey,
  updatePositionWithTrade
}
