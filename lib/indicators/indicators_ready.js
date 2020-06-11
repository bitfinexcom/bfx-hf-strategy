'use strict'

const findIndicator = require('./find_indicator')

/**
 * Checks if all indicators have been marked as ready (seed period fulfilled)
 *
 * @param {StrategyState} state - strategy state
 * @returns {boolean} ready - true if all indicators are ready
 */
const indicatorsReady = (state = {}) => {
  return findIndicator(state, i => !i.ready()) === null
}

module.exports = indicatorsReady
