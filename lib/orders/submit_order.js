'use strict'

/**
 * @param {Object} strategyState
 * @param {Object|Array|Order} order
 * @return {Promise} p - resolves to full Order model
 */
module.exports = async (strategyState = {}, order = {}) => {
  const { ws } = strategyState

  return ws.submitOrder(order)
}
