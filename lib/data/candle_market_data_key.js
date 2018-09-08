'use strict'

module.exports = (candle = {}) => (
  `candles-${candle.symbol}-${candle.tf}`
)
