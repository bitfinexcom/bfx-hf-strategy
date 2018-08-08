'use strict'

const { Strategy } = require('bfx-hf-db')

/**
 * Creates a new model for the current strategy
 *
 * @param {Object} strategyState - current strategy to create model for
 * @param {string} strategyState.id - internal strategy ID
 * @param {string} strategyState.name - human-readable strategy name
 * @param {boolean} strategyState.margin - if true, trades on margin
 * @return {Strategy} model
 */
module.exports = async (strategyState = {}) => {
  const { id, name, margin } = strategyState

  return Strategy
    .query()
    .insert({
      margin,
      class_id: id,
      class_name: name,

      // NOTE: unused
      active: false,
      started_at: null
    })
}
