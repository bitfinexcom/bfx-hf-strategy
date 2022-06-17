'use strict'

const { std } = require('mathjs')
const _sum = require('lodash/sum')
const _min = require('lodash/min')
const _max = require('lodash/max')
const _pick = require('lodash/pick')
const _isNil = require('lodash/isNil')
const _isFinite = require('lodash/isFinite')
const _isPlainObject = require('lodash/isPlainObject')

const TRADE_FIELDS = [
  'order_id', 'amount', 'order_js.type', 'order_js.mtsCreate',
  'order_js.mtsUpdate', 'order_js.price', 'order_js.priceAvg'
]

const formatPositions = (positions = []) => {
  if (positions.length === 0) {
    return []
  }

  return Object.fromEntries(positions.map(p => {
    const { id, entryPrice, entryAt, closingPrice, closedAt, pl, symbol, trades } = p
    return [id, {
      id,
      pl,
      symbol,
      entryAt,
      entryPrice,
      closedAt,
      closingPrice,
      trades: trades.map(
        t => _pick(t, TRADE_FIELDS)
      )
    }]
  }))
}

module.exports = (perfManager, strategyState = {}, openPosition = null) => {
  const {
    tf,
    symbol,
    trades: strategyTrades = [],
    marketData = {},
    closedPositions = [],
    positions = {}
  } = strategyState

  if (_isPlainObject(openPosition)) {
    const openOrder = strategyTrades.find(st => st.position_id === openPosition.id)
    if (openOrder) {
      openOrder.pl = openPosition.pl
    }
  }

  if (!_isFinite(strategyState.nCandles)) {
    const candles = marketData[`candles-${symbol}-${tf}`] || []
    strategyState.nCandles = candles.length
  }

  if (!_isFinite(strategyState.nTrades)) {
    const trades = marketData[`trades-${symbol}`] || []
    strategyState.nTrades = trades.length
  }

  const nStrategyTrades = strategyTrades.length
  const pls = strategyTrades.map(t => t.pl)
  const gains = pls.filter(pl => pl > 0)
  const losses = pls.filter(pl => pl < 0)
  const vol = _sum(strategyTrades.map(t => Math.abs(t.price * t.amount)))
  const fees = _sum(strategyTrades.map(t => t.fee))
  const totalGain = _sum(gains)
  const totalLoss = _sum(losses)
  const pf = totalGain / Math.abs(totalLoss)
  const pl = _sum(pls)
  const minPL = _min(pls)
  const maxPL = _max(pls)
  const accumulatedPLs = strategyTrades.map(x => x.pl)
  const stdDeviation = std(accumulatedPLs.length > 0 ? accumulatedPLs : [0])
  const avgPL = _sum(accumulatedPLs) / accumulatedPLs.length
  const allocation = perfManager.allocation
  const positionSize = perfManager.positionSize()
  const currentAllocation = perfManager.currentAllocation()
  const availableFunds = perfManager.availableFunds
  const equityCurve = perfManager.equityCurve()
  const ret = perfManager.return()
  const retPerc = perfManager.returnPerc()
  const drawdown = perfManager.drawdown()
  const openPositions = formatPositions(Object.values(positions))
  const nOpens = openPositions.length

  return {
    vol,
    fees,
    nStrategyTrades,
    nTrades: strategyState.nTrades,
    nCandles: strategyState.nCandles,
    nOpens,
    nGains: gains.length,
    nLosses: losses.length,

    stdDeviation,
    pl,
    pf: isNaN(pf) ? 0 : pf,
    avgPL: isNaN(avgPL) ? 0 : avgPL,
    minPL: _isNil(minPL) ? 0 : minPL,
    maxPL: _isNil(maxPL) ? 0 : maxPL,

    allocation,
    positionSize,
    currentAllocation,
    availableFunds,
    equityCurve,
    return: ret,
    returnPerc: retPerc,
    drawdown,

    strategy: {
      closedPositions: formatPositions(closedPositions),
      openPositions
    }
  }
}
