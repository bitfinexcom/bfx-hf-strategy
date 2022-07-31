'use strict'

const { std } = require('mathjs')
const _sum = require('lodash/sum')
const _min = require('lodash/min')
const _max = require('lodash/max')
const _pick = require('lodash/pick')
const _isNil = require('lodash/isNil')
const _isFinite = require('lodash/isFinite')
const _isPlainObject = require('lodash/isPlainObject')
const BigNumber = require('bignumber.js')
const {
  calcRealizedPositionPnl,
  calcRealizedStrategyPnl,
  calcUnrealizedPositionPnl,
  calcUnrealizedStrategyPnl
} = require('../pnl')

const TRADE_FIELDS = [
  'order_id', 'amount', 'order_js.type', 'order_js.mtsCreate',
  'order_js.mtsUpdate', 'order_js.price', 'order_js.priceAvg',
  'order_js.amount', 'order_js.amountOrig'
]

const calcVolume = (trades) => {
  return trades.map(t => new BigNumber(t.amount))
    .reduce(
      (volume, amount) => volume.plus(amount.abs()),
      new BigNumber(0)
    )
}

const formatPositions = (positions = [], currentPrice) => {
  if (positions.length === 0) {
    return {}
  }

  return Object.fromEntries(positions.map(p => {
    const { id, entryPrice, entryAt, closingPrice, closedAt, symbol, trades = [] } = p
    const amount = calcVolume(trades)

    const realizedPnl = calcRealizedPositionPnl(p)
    const unrealizedPnl = currentPrice ? calcUnrealizedPositionPnl(p, currentPrice) : 0

    return [id, {
      id,
      symbol,
      entryAt,
      entryPrice,
      closedAt,
      closingPrice,
      amount,
      realizedPnl,
      unrealizedPnl,
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

  const tradePnls = strategyTrades.map(t => t.realizedPnl)
  const gains = tradePnls.filter(pnl => pnl.isPositive())
  const losses = tradePnls.filter(pnl => pnl.isNegative())
  const totalGain = gains.reduce((total, v) => total.plus(v), new BigNumber(0))
  const totalLoss = losses.reduce((total, v) => total.plus(v), new BigNumber(0))
  const profitFactor = totalLoss.isZero() ? 1 : totalGain.dividedBy(totalLoss.abs())
  const largestLoss = losses.reduce((acc, v) => acc.isLessThan(v) ? acc : v, new BigNumber(0))
  const largestGain = gains.reduce((acc, v) => acc.isGreaterThan(v) ? acc : v, new BigNumber(0))
  const pnlStdDeviation = tradePnls.length > 0 ? std(tradePnls.map(pnl => pnl.toNumber())) : 0
  const averageTradePnl = tradePnls.length > 0 ? totalGain.plus(totalLoss).dividedBy(tradePnls.length) : 0

  const volume = calcVolume(strategyTrades)
  const nStrategyTrades = strategyTrades.length
  const fees = _sum(strategyTrades.map(t => t.fee))
  const allocation = perfManager.allocation
  const positionSize = perfManager.positionSize()
  const currentAllocation = perfManager.currentAllocation()
  const availableFunds = perfManager.availableFunds
  const equityCurve = perfManager.equityCurve()
  const ret = perfManager.return()
  const retPerc = perfManager.returnPerc()
  const drawdown = perfManager.drawdown()
  const openPositions = Object.values(positions)
  const nOpens = openPositions.length

  const { priceFeed: { price: currentPrice } } = perfManager
  const realizedStrategyPnl = calcRealizedStrategyPnl(strategyState)
  const unrealizedStrategyPnl = calcUnrealizedStrategyPnl(strategyState, currentPrice)

  return {
    vol: volume,
    fees,
    nStrategyTrades,
    nTrades: strategyState.nTrades,
    nCandles: strategyState.nCandles,
    nOpens,
    nGains: gains.length,
    nLosses: losses.length,

    pnlStdDeviation,
    profitFactor,
    averageTradePnl,
    largestLoss,
    largestGain,
    realizedStrategyPnl,
    unrealizedStrategyPnl,

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
      openPositions: formatPositions(openPositions, currentPrice)
    }
  }
}
