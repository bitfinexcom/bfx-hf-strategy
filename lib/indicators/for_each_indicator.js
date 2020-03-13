'use strict'

/**
 * Calls the provided function with each indicator on the strategy.
 *
 * @param {object} state
 * @param {Function} f
 */
const forEachIndicator = (state = {}, f = () => {}) => {
  const { indicators = {} } = state

  for (const key in indicators) {
    f(indicators[key], key)
  }
}

module.exports = forEachIndicator
