'use strict'

// TODO: doc
const getFees = (state = {}, symbol = null) => {
  const { makerFee, takerFee } = state
  return { maker: makerFee, taker: takerFee }
}

module.exports = getFees
