'use strict'

const forEachIndicator = require('./for_each_indicator')

/**
 * Adds the provided data update packet to all strategy indicators matching the
 * update type.
 *
 * @param {object} state
 * @param {string} type
 * @param {object} update
 * @param {Function} f
 */
const addIndicatorData = (state = {}, type, update) => {
  forEachIndicator(state, i => {
    const dt = i.getDataType()
    const dk = i.getDataKey()

    if (dt === '*' || dt === type) {
      i.add(dk === '*' ? update : update[dk])
    }
  })
}

module.exports = addIndicatorData
