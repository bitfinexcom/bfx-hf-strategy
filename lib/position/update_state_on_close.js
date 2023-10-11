'use strict'

const { calcRealizedPositionPnl } = require('../pnl')
const _isFunction = require('lodash/isFunction')
const debug = require('debug')('bfx:hf:strategy:position:update-state-on-close')

/**
 * Updates state object after position closes with order
 *
 * @param {Object} state - strategy state
 * @param {Object} trade - executed trade
 * @param {Object} order - executed order
 * @param {Object} positionData
 * @param {String} symbol
 * @return {Object} nextState
 */
module.exports = async (state = {}, order, trade, positionData, symbol) => {
  const { positions, onPositionClose, onOrderFill, backtesting, emit } = state

  const {
    [symbol]: prevPosition,
    ...otherPositions // NOTE: Used as next positions map!
  } = positions

  let nextState = state

  if (!backtesting) {
    if (_isFunction(onOrderFill)) {
      nextState = await onOrderFill(nextState, {
        order,
        trade
      })
    }
  }

  if (_isFunction(onPositionClose)) {
    nextState = await onPositionClose(nextState, {
      position: positionData,
      order,
      trade
    })
  }

  if (!backtesting) {
    debug('CLOSE %s @ %f | %s | PL %f', symbol, order.priceAvg, order.type, trade.realizedPnl.toString())
  }

  if (_isFunction(emit)) {
    emit('closed_position_data', {
      ...positionData,
      realizedPnl: calcRealizedPositionPnl(positionData),
      unrealizedPnl: 0
    })
  }

  return {
    ...nextState,
    positions: otherPositions,
    closedPositions: [
      ...nextState.closedPositions || [],
      positionData
    ],
    trades: [
      ...nextState.trades,
      trade
    ]
  }
}
