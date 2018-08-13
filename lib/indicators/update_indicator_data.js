'use strict'

const forEachIndicator = require('./for_each_indicator')

/**
 * @param {Object} state
 * @param {string} type
 * @param {Object} update
 * @param {Function} f
 */
const updateIndicatorData = (state = {}, type, update) => {
  forEachIndicator(state, i => {
    const dt = i.getDataType()
    const dk = i.getDataKey()

    if (dt === '*' || dt === type) {
      i.update(dk === '*' ? update : update[dk])
    }
  })
}

module.exports = updateIndicatorData