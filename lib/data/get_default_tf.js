'use strict'

/**
 * Returns the default time frame for the strategy; a strategy can have either a
 * set of multiple time frames, a single default time frame, or both.
 *
 * @param {Object} strategyState
 * @return {string} defaultTF
 */
const getDefaultTF = (strategyState = {}) => {
  const { tf } = strategyState
  return tf
}

module.exports = getDefaultTF
