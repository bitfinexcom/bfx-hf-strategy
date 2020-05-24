'use strict'

const addCandleData = require('./add_candle_data')
const addTradeData = require('./add_trade_data')
const candleMarketDataKey = require('./candle_market_data_key')
const getCandle = require('./get_candle')
const getCandles = require('./get_candles')
const getDefaultCandles = require('./get_default_candles')
const getDefaultSymbol = require('./get_default_symbol')
const getDefaultTF = require('./get_default_tf')
const getDefaultTrades = require('./get_default_trades')
const getLastPrice = require('./get_last_price')
const getNumCandles = require('./get_num_candles')
const getNumTrades = require('./get_num_trades')
const getPosition = require('./get_position')
const getTrade = require('./get_trade')
const getTrades = require('./get_trades')
const isLong = require('./is_long')
const isShort = require('./is_short')
const positionPl = require('./position_pl')
const tradeMarketDataKey = require('./trade_market_data_key')
const updatePositionWithTrade = require('./update_position_with_trade')
const getIndicators = require('./get_indicators')
const getIndicator = require('./get_indicator')
const getStrategyTrades = require('./get_strategy_trades')
const getFees = require('./get_fees')

module.exports = {
  addCandleData,
  addTradeData,
  candleMarketDataKey,
  getCandle,
  getCandles,
  getDefaultCandles,
  getDefaultSymbol,
  getDefaultTF,
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
  updatePositionWithTrade,
  getIndicators,
  getIndicator,
  getStrategyTrades,
  getFees,
}
