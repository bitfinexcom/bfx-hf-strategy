'use strict';

const closeOpenPositions = require('./close_open_positions');

const closePosition = require('./close_position');

const closePositionLimit = require('./close_position_limit');

const closePositionMarket = require('./close_position_market');

const closePositionWithOrder = require('./close_position_with_order');

const createPositionObject = require('./create_position_object');

const openLongPosition = require('./open_long_position');

const openLongPositionLimit = require('./open_long_position_limit');

const openLongPositionMarket = require('./open_long_position_market');

const openPosition = require('./open_position');

const openPositionLimit = require('./open_position_limit');

const openPositionMarket = require('./open_position_market');

const openPositionWithOrder = require('./open_position_with_order');

const openShortPosition = require('./open_short_position');

const openShortPositionLimit = require('./open_short_position_limit');

const openShortPositionMarket = require('./open_short_position_market');

const updateLongPosition = require('./update_long_position');

const updateLongPositionLimit = require('./update_long_position_limit');

const updateLongPositionMarket = require('./update_long_position_market');

const updatePosition = require('./update_position');

const updatePositionLimit = require('./update_position_limit');

const updatePositionMarket = require('./update_position_market');

const updatePositionWithOrder = require('./update_position_with_order');

const updateShortPosition = require('./update_short_position');

const updateShortPositionLimit = require('./update_short_position_limit');

const updateShortPositionMarket = require('./update_short_position_market');

const withNoPosition = require('./with_no_position');

const withPosition = require('./with_position');

const positionPl = require('./position_pl');

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
  withPosition
};