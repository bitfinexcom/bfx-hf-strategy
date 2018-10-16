'use strict'

const _isFinite = require('lodash/isFinite')
const forEachIndicator = require('./for_each_indicator')

/**
 * @param {Object} state
 * @param {string} type
 * @param {Object|number} update
 * @param {Function} f
 */
const updateIndicatorData = (state = {}, type, update) => {
  forEachIndicator(state, i => {
    const dt = i.getDataType()
    const dk = i.getDataKey()

    if (dt !== '*' && dt !== type) {
      return
    }

    if (_isFinite(update)) {
      i.update(update)
    } else {
      i.update(dk === '*' ? update : update[dk])
    }
  })
}

module.exports = updateIndicatorData
