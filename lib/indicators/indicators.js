'use strict'

/**
 * Strategy indicators selector
 *
 * TODO: Support multiple time frames/symbols (the main point here)
 *
 * @param {Object} strategyState
 * @return {Object} indicators
 */
module.exports = (strategyState = {}) => {
  const { indicators = {} } = strategyState
  return indicators
}
