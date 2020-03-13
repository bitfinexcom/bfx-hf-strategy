'use strict'

const forEachIndicator = require('./for_each_indicator')

/**
 * Returns the minimum seed period required for the strategy
 *
 * @memberOf module:Indicators
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @returns {number} seedPeriod
 */
const seedPeriodForIndicators = (state = {}) => {
  let period = 0

  forEachIndicator(state, i => {
    if (i.getSeedPeriod() > period) {
      period = i.getSeedPeriod()
    }
  })

  return period
}

module.exports = seedPeriodForIndicators
