'use strict'

/**
 * A set of utility functions bound to the strategy they are used in, providing
 * control over strategy execution, access to data, and order manipulation
 * methods.
 *
 * @typedef {object} module:bfx-hf-strategy.Helpers
 * @property {module:bfx-hf-strategy.trades} trades -
 *   {@link module:bfx-hf-strategy.trades|function}
 * @property {module:bfx-hf-strategy.closeOpenPositions} closeOpenPositions -
 *   {@link module:bfx-hf-strategy.closeOpenPositions|function}
 * @property {module:bfx-hf-strategy.closePosition} closePosition -
 *   {@link module:bfx-hf-strategy.closePosition|function}
 * @property {module:bfx-hf-strategy.closePositionLimit} closePositionLimit -
 *   {@link module:bfx-hf-strategy.closePositionLimit|function}
 * @property {module:bfx-hf-strategy.closePositionMarket} closePositionMarket -
 *   {@link module:bfx-hf-strategy.closePositionMarket|function}
 * @property {module:bfx-hf-strategy.closePositionWithOrder} closePositionWithOrder -
 *   {@link module:bfx-hf-strategy.closePositionWithOrder|function}
 * @property {module:bfx-hf-strategy.openLongPosition} openLongPosition -
 *   {@link module:bfx-hf-strategy.openLongPosition|function}
 * @property {module:bfx-hf-strategy.openLongPositionLimit} openLongPositionLimit -
 *   {@link module:bfx-hf-strategy.openLongPositionLimit|function}
 * @property {module:bfx-hf-strategy.openLongPositionMarket} openLongPositionMarket -
 *   {@link module:bfx-hf-strategy.openLongPositionMarket|function}
 * @property {module:bfx-hf-strategy.openPosition} openPosition -
 *   {@link module:bfx-hf-strategy.openPosition|function}
 * @property {module:bfx-hf-strategy.openPositionLimit} openPositionLimit -
 *   {@link module:bfx-hf-strategy.openPositionLimit|function}
 * @property {module:bfx-hf-strategy.openPositionMarket} openPositionMarket -
 *   {@link module:bfx-hf-strategy.openPositionMarket|function}
 * @property {module:bfx-hf-strategy.openPositionWithOrder} openPositionWithOrder -
 *   {@link module:bfx-hf-strategy.openPositionWithOrder|function}
 * @property {module:bfx-hf-strategy.openShortPosition} openShortPosition -
 *   {@link module:bfx-hf-strategy.openShortPosition|function}
 * @property {module:bfx-hf-strategy.openShortPositionLimit} openShortPositionLimit -
 *   {@link module:bfx-hf-strategy.openShortPositionLimit|function}
 * @property {module:bfx-hf-strategy.openShortPositionMarket} openShortPositionMarket -
 *   {@link module:bfx-hf-strategy.openShortPositionMarket|function}
 * @property {module:bfx-hf-strategy.updateLongPosition} updateLongPosition -
 *   {@link module:bfx-hf-strategy.updateLongPosition|function}
 * @property {module:bfx-hf-strategy.updateLongPositionLimit} updateLongPositionLimit -
 *   {@link module:bfx-hf-strategy.updateLongPositionLimit|function}
 * @property {module:bfx-hf-strategy.updateLongPositionMarket} updateLongPositionMarket -
 *   {@link module:bfx-hf-strategy.updateLongPositionMarket|function}
 * @property {module:bfx-hf-strategy.updatePosition} updatePosition -
 *   {@link module:bfx-hf-strategy.updatePosition|function}
 * @property {module:bfx-hf-strategy.updatePositionMarket} updatePositionMarket -
 *   {@link module:bfx-hf-strategy.updatePositionMarket|function}
 * @property {module:bfx-hf-strategy.updatePositionWithOrder} updatePositionWithOrder -
 *   {@link module:bfx-hf-strategy.updatePositionWithOrder|function}
 * @property {module:bfx-hf-strategy.updateShortPosition} updateShortPosition -
 *   {@link module:bfx-hf-strategy.updateShortPosition|function}
 * @property {module:bfx-hf-strategy.updateShortPositionLimit} updateShortPositionLimit -
 *   {@link module:bfx-hf-strategy.updateShortPositionLimit|function}
 * @property {module:bfx-hf-strategy.withNoPosition} withNoPosition -
 *   {@link module:bfx-hf-strategy.withNoPosition|function}
 * @property {module:bfx-hf-strategy.withPosition} withPosition -
 *   {@link module:bfx-hf-strategy.withPosition|function}
 * @property {module:bfx-hf-strategy.minTradeIntervalMet} minTradeIntervalMet -
 *   {@link module:bfx-hf-strategy.minTradeIntervalMet|function}
 * @property {module:bfx-hf-strategy.enforceMinTradeInterval} enforceMinTradeInterval -
 *   {@link module:bfx-hf-strategy.enforceMinTradeInterval|function}
 * @property {module:bfx-hf-strategy.getState} getState -
 *   {@link module:bfx-hf-strategy.getState|function}
 * @property {module:bfx-hf-strategy.getLastPrice} getLastPrice -
 *   {@link module:bfx-hf-strategy.getLastPrice|function}
 * @property {module:bfx-hf-strategy.indicatorValues} indicatorValues -
 *   {@link module:bfx-hf-strategy.indicatorValues|function}
 * @property {module:bfx-hf-strategy.indicators} indicators -
 *   {@link module:bfx-hf-strategy.indicators|function}
 * @property {module:bfx-hf-strategy.inAPosition} inAPosition -
 *   {@link module:bfx-hf-strategy.inAPosition|function}
 * @property {module:bfx-hf-strategy.inALongPosition} inALongPosition -
 *   {@link module:bfx-hf-strategy.inALongPosition|function}
 * @property {module:bfx-hf-strategy.inAShortPosition} inAShortPosition -
 *   {@link module:bfx-hf-strategy.inAShortPosition|function}
 * @property {module:bfx-hf-strategy.condition} condition -
 *   {@link module:bfx-hf-strategy.condition|function}
 * @property {module:bfx-hf-strategy.conditionIndicatorCrossed} conditionIndicatorCrossed -
 *   {@link module:bfx-hf-strategy.conditionIndicatorCrossed|function}
 * @property {module:bfx-hf-strategy.conditionIndicatorsCrossed} conditionIndicatorsCrossed -
 *   {@link module:bfx-hf-strategy.conditionIndicatorsCrossed|function}
 * @property {module:bfx-hf-strategy.conditionInAPosition} conditionInAPosition -
 *   {@link module:bfx-hf-strategy.conditionInAPosition|function}
 */
