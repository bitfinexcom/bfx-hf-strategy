// @create-index

const closeOpenPositions = require('./close_open_positions.js')
const closePosition = require('./close_position.js')
const closePositionLimit = require('./close_position_limit.js')
const closePositionMarket = require('./close_position_market.js')
const closePositionWithOrder = require('./close_position_with_order.js')
const createPositionObject = require('./create_position_object.js')
const openLongPosition = require('./open_long_position.js')
const openLongPositionLimit = require('./open_long_position_limit.js')
const openLongPositionMarket = require('./open_long_position_market.js')
const openPosition = require('./open_position.js')
const openPositionLimit = require('./open_position_limit.js')
const openPositionMarket = require('./open_position_market.js')
const openPositionWithOrder = require('./open_position_with_order.js')
const openShortPosition = require('./open_short_position.js')
const openShortPositionLimit = require('./open_short_position_limit.js')
const openShortPositionMarket = require('./open_short_position_market.js')
const positionPl = require('./position_pl.js')
const setPositionStop = require('./set_position_stop.js')
const throwIfPosition = require('./throw_if_position.js')
const updateLongPosition = require('./update_long_position.js')
const updateLongPositionLimit = require('./update_long_position_limit.js')
const updateLongPositionMarket = require('./update_long_position_market.js')
const updatePosition = require('./update_position.js')
const updatePositionLimit = require('./update_position_limit.js')
const updatePositionMarket = require('./update_position_market.js')
const updatePositionWithOrder = require('./update_position_with_order.js')
const updateShortPosition = require('./update_short_position.js')
const updateShortPositionLimit = require('./update_short_position_limit.js')
const updateShortPositionMarket = require('./update_short_position_market.js')
const withNoPosition = require('./with_no_position.js')
const withPosition = require('./with_position.js')
const closePendingOrders = require('./close_pending_orders')

module.exports = {
  closeOpenPositions,
  closePosition,
  closePositionLimit,
  closePositionMarket,
  closePositionWithOrder,
  createPositionObject,
  openLongPosition,
  openLongPositionLimit,
  openLongPositionMarket,
  openPosition,
  openPositionLimit,
  openPositionMarket,
  openPositionWithOrder,
  openShortPosition,
  openShortPositionLimit,
  openShortPositionMarket,
  positionPl,
  setPositionStop,
  throwIfPosition,
  updateLongPosition,
  updateLongPositionLimit,
  updateLongPositionMarket,
  updatePosition,
  updatePositionLimit,
  updatePositionMarket,
  updatePositionWithOrder,
  updateShortPosition,
  updateShortPositionLimit,
  updateShortPositionMarket,
  withNoPosition,
  withPosition,
  closePendingOrders
}
