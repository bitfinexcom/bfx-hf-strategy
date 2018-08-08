'use strict'

const debug = require('debug')('hf:strat:close-position')
const _isObject = require('lodash/isObject')
const _isFunction = require('lodash/isFunction')

const getDefaultSymbol = require('../data/get_default_symbol')
const submitTrade = require('../orders/submit_trade')
const updatePositionModel = require('../model/update_position_model')
const updateTradeForPosition = require('../trades/update_trade_for_position')
const validateOrderParams = require('../orders/validate_order_params')
const positionPL = require('../data/position_pl')
const updatePositionWithTrade = require('../data/update_position_with_trade')

module.exports = async (state = {}, orderParams = {}) => {
  const { positions, backtesting, onPositionClose, onOrderFill } = state
  const symbol = orderParams.symbol || getDefaultSymbol(state)

  if (!orderParams.symbol) {
    orderParams.symbol = symbol
  }

  const {
    [symbol]: prevPosition,
    ...otherPositions // NOTE: Used as next positions map!
  } = positions

  if (!_isObject(prevPosition)) {
    throw new Error('no position is currently open')
  } else if (prevPosition.amount + orderParams.amount !== 0) { // TODO: Extract
    throw new Error(`order would not close position (pos for ${prevPosition.amount})`)
  }

  validateOrderParams(state, orderParams)

  let nextState = state
  const { o, trade } = await submitTrade(nextState, orderParams)
  const positionData = updatePositionWithTrade(prevPosition, trade)

  if (!backtesting) {
    if (_isFunction(onOrderFill)) {
      nextState = await onOrderFill(nextState, {
        order: o,
        trade
      })
    }

    const positionModel = await updatePositionModel(nextState, positionData)
    await updateTradeForPosition(nextState, trade, positionModel)
  }

  trade.pl = positionPL(positionData)

  if (_isFunction(onPositionClose)) {
    nextState = await onPositionClose(nextState, {
      position: positionData,
      order: o,
      trade
    })
  }

  debug('CLOSE %s @ %f | %s | PL %f', symbol, o.priceAvg, o.type, trade.pl)

  return {
    ...nextState,
    positions: otherPositions,
    trades: [
      ...nextState.trades,
      trade
    ]
  }
}
