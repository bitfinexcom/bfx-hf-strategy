'use strict'

/**
 * Extracts fee data from strategy state
 *
 * @param {StrategyState} state - strategy state
 * @returns {object} fees - { maker, taker }
 */
const getFees = (state = {}) => {
  const { makerFee, takerFee } = state
  return { maker: makerFee, taker: takerFee }
}

module.exports = getFees
