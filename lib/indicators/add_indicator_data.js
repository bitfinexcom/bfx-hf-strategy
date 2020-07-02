'use strict'

const _includes = require('lodash/includes')
const forEachIndicator = require('./for_each_indicator')

/**
 * Adds the provided data update packet to all strategy indicators matching the
 * update type.
 *
 * @param {StrategyState} state - strategy state
 * @param {string} type - data type, 'trade' or 'candle'
 * @param {object} update - data point
 * @throws {Error} fails if given an unknown data type
 */
const addIndicatorData = (state = {}, type, update) => {
  if (!_includes(['trade', 'candle'], type)) {
    throw new Error(`unknown data type: ${type}`)
  }

  forEachIndicator(state, i => {
    const dt = i.getDataType()
    const dk = i.getDataKey()

    if (dt === '*' || dt === type) {
      i.add(dk === '*' ? update : update[dk])
    }
  })
}

module.exports = addIndicatorData
