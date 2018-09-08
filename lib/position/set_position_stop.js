'use init'

const getDefaultSymbol = require('../data/get_default_symbol')
const getPosition = require('../data/get_position')

module.exports = async (state = {}, stop, _symbol) => {
  const symbol = _symbol || getDefaultSymbol(state)
  const position = getPosition(state, symbol)

  return {
    ...state,
    positions: {
      ...state.positions,
      [symbol]: {
        ...position,
        stop
      }
    }
  }
}
