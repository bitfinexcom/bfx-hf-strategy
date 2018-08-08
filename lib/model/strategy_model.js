'use strict'

const _isEmpty = require('lodash/isEmpty')
const createStrategyModel = require('./create_strategy_model')
const getStrategyModel = require('./get_strategy_model')

/**
 * Creates a new strategy model, or returns an existing one if found
 *
 * @param {Object} strategyState
 * @return {Strategy} m
 */
module.exports = async (strategyState = {}) => {
  const m = await getStrategyModel(strategyState)

  if (_isEmpty(m)) {
    return createStrategyModel(strategyState)
  }

  return m
}
