'use strict'

const isLong = require('./is_long')
const isShort = require('./is_short')
const getFees = require('./get_fees')
const getTrade = require('./get_trade')
const getTrades = require('./get_trades')
const getCandle = require('./get_candle')
const getCandles = require('./get_candles')
const positionPl = require('./position_pl')
const getPosition = require('./get_position')
const getIndicator = require('./get_indicator')
const addTradeData = require('./add_trade_data')
const getDefaultTF = require('./get_default_tf')
const getNumTrades = require('./get_num_trades')
const getLastPrice = require('./get_last_price')
const getIndicators = require('./get_indicators')
const getNumCandles = require('./get_num_candles')
const addCandleData = require('./add_candle_data')
const getDefaultSymbol = require('./get_default_symbol')
const getDefaultTrades = require('./get_default_trades')
const getDefaultCandles = require('./get_default_candles')
const getStrategyTrades = require('./get_strategy_trades')
const tradeMarketDataKey = require('./trade_market_data_key')
const candleMarketDataKey = require('./candle_market_data_key')
const updatePositionWithTrade = require('./update_position_with_trade')

module.exports = {
  isLong,
  isShort,
  getFees,
  getTrade,
  getTrades,
  getCandle,
  getCandles,
  positionPl,
  getPosition,
  getIndicator,
  getLastPrice,
  getNumTrades,
  addTradeData,
  getDefaultTF,
  getIndicators,
  getNumCandles,
  addCandleData,
  getDefaultSymbol,
  getDefaultTrades,
  getStrategyTrades,
  getDefaultCandles,
  tradeMarketDataKey,
  candleMarketDataKey,
  updatePositionWithTrade
}
