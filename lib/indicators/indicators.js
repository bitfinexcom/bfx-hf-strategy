'use strict'

/**
 * Strategy indicators selector
 *
 * @param {object} strategyState
 * @return {object} indicators
 */
const indicators = (strategyState = {}) => {
  const { indicators = {} } = strategyState
  return indicators
}

module.exports = indicators
