'use strict'

/**
 * Strategy indicators selector
 *
 * @param {Object} strategyState
 * @return {Object} indicators
 */
const indicators = (strategyState = {}) => {
  const { indicators = {} } = strategyState
  return indicators
}

module.exports = indicators
