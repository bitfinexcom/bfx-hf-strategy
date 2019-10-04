'use strict'

const _isFinite = require('lodash/isFinite')
const closePositionMarket = require('../position/close_position_market')
const withPosition = require('../position/with_position')
const withNoPosition = require('../position/with_no_position')

const defaultHandler = s => s

/**
 * Passes the incoming price update to the relevant strategy lifecycle methods:
 *
 * onPriceUpdate - always called
 * onEnter - called if no position is open
 * onUpdateShort - called if a short position is open
 * onUpdateLong - called if a long position is open
 * onUpdateClosing - called if a position is open but currently closing
 * onUpdate - called if a position is open
 *
 * Returns the resulting strategy state
 *
 * @param {Object} state
 * @param {Object} update - incoming price update
 * @return {Promise} p - resolves to nextState
 */
const onPriceUpdate = async (state = {}, update = {}) => {
  const { mts, price, symbol } = update
  const {
    onEnter = defaultHandler,
    onPriceUpdate = defaultHandler,
    onUpdateShort = defaultHandler,
    onUpdateLong = defaultHandler,
    onUpdateClosing = defaultHandler,
    onUpdate = defaultHandler
  } = state

  const orderParams = {
    price,
    symbol,
    mtsCreate: mts
  }

  let nextState = state

  await withNoPosition(nextState, symbol, async () => {
    nextState = await onEnter(nextState, update)
  })

  await withPosition(nextState, symbol, async ({ amount, stop, target }) => {
    if (
      _isFinite(stop) &&
      ((amount > 0 && price <= stop) || (amount < 0 && price >= stop))
    ) {
      nextState = await closePositionMarket(nextState, {
        label: `stop (${stop}) price reached (${price})`,
        ...orderParams
      })
    } else if (
      _isFinite(target) &&
      ((amount > 0 && price >= target) || (amount < 0 && price <= target))
    ) {
      nextState = await closePositionMarket(nextState, {
        label: `target (${target}) price reached (${price})`,
        ...orderParams
      })
    }
  })

  await withPosition(nextState, symbol, async () => {
    nextState = await onUpdate(nextState, update)
  })

  await withPosition(nextState, symbol, async ({ amount, closing }) => {
    if (closing) {
      nextState = await onUpdateClosing(nextState, update)
    } else {
      nextState = amount > 0
        ? await onUpdateLong(nextState, update)
        : await onUpdateShort(nextState, update)
    }
  })

  return onPriceUpdate(nextState, update)
}

module.exports = onPriceUpdate
