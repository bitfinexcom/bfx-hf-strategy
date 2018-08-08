'use strict'

const { Strategy } = require('bfx-hf-strategy')

module.exports = async (strategyState = {}) => {
  const { id, name } = strategyState

  return Strategy
    .query()
    .where(b => {
      b.where('class_id', id).andWhere('class_name', name)
    })
    .limit(1)
}
