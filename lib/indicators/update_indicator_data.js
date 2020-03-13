'use strict'

const _isFinite = require('lodash/isFinite')

/**
 * @param {object} state
 * @param {string} type
 * @param {object|number} update
 * @param {Function} f
 */
const updateIndicatorData = (state = {}, type, update) => {
  const { indicators = {} } = state
  const indicatorKeys = Object.keys(indicators)
  let i

  while (i < indicatorKeys.length) {
    i = indicators[indicatorKeys[i]]
    const dt = i.getDataType()
    const dk = i.getDataKey()

    if (dt !== '*' && dt !== type) {
      continue
    }

    if (_isFinite(update)) {
      i.update(update)
    } else {
      i.update(dk === '*' ? update : update[dk])
    }

    i += 1
  }
}

module.exports = updateIndicatorData
