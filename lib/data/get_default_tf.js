'use strict'

/**
 * Returns the default time frame for the strategy; a strategy can have either a
 * set of multiple time frames, a single default time frame, or both.
 *
 * @param {StrategyState} state - strategy state
 * @returns {string} defaultTF
 */
const getDefaultTF = (state = {}) => {
  const { tf } = state
  return tf
}

module.exports = getDefaultTF
