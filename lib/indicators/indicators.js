'use strict'

/**
 * Strategy indicators selector
 *
 * @param {Object} strategyState
 * @return {Object} indicators
 */
module.exports = (strategyState = {}) => {
  const { indicators = {} } = strategyState
  return indicators
}
