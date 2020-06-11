'use strict';
/**
 * Extracts fee data from strategy state
 *
 * @param {StrategyState} state - strategy state
 * @returns {object} fees - { maker, taker }
 */

const getFees = (state = {}) => {
  const makerFee = state.makerFee,
        takerFee = state.takerFee;
  return {
    maker: makerFee,
    taker: takerFee
  };
};

module.exports = getFees;