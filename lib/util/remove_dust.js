'use strict'

const DEFAULT_DECIMAL_POINTS = 8

module.exports = (number, decimalPoints = DEFAULT_DECIMAL_POINTS) => {
  return +number.toFixed(decimalPoints)
}
