'use strict'

const getPosition = require('./get_position')

module.exports = (state = {}, forSymbol) => {
  const position = getPosition(state, forSymbol)

  return position.amount > 0
}
