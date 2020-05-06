'use strict'

const _includes = require('lodash/includes')
const _isFinite = require('lodash/isFinite')

/**
 *
 * @memberof module:Indicators
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {string} type - update type, 'trade' or 'candle'
 * @param {object|number} update - data point
 * @throws {Error} fails if given an unknown data type
 */
const updateIndicatorData = (state = {}, type, update) => {
  if (!_includes(['trade', 'candle'], type)) {
    throw new Error(`unknown data type: ${type}`)
  }

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
