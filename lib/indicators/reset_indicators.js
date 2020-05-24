'use strict'

const forEachIndicator = require('./for_each_indicator')

/**
 * Resets all of the strategy's indicators
 *
 * @memberof module:bfx-hf-strategy
 * @private
 *
 * @param {module:bfx-hf-strategy.StrategyState} state - strategy state
 */
const resetIndicators = (state = {}) => {
  forEachIndicator(state, i => i.reset())
}

module.exports = resetIndicators
