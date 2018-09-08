'use strict'

const debug = require('debug')('hf:strategy:orders:submit')
const { submitOrder } = require('bfx-api-node-core')
const { nonce } = require('bfx-api-node-util')
const Promise = require('bluebird')

/**
 * @param {Object} strategyState
 * @param {Object|Array|Order} order
 * @return {Promise} p - resolves to full Order model
 */
module.exports = async (strategyState = {}, order = {}) => {
  const { ws } = strategyState
  const { amount, price, type } = order
  const { ev } = ws

  order.cid = nonce()

  debug('submitting order %f @ %f [%s]', amount, price, type)

  // Listen for 'oc' message to confirm order filled
  return new Promise((resolve, reject) => {
    submitOrder(ws, order).then(() => {
      debug('order submitted')
    }).catch((err) => {
      debug('error submitting order: %s', err)
      ev.off('data:auth', listener)
      reject(err)
    })

    const listener = (data = []) => {
      const [, type, payload] = data

      if (type !== 'oc') {
        return
      }

      const { cid } = payload

      if (cid === order.cid) {
        debug('received order close')
        ev.off('data:auth', listener)
        resolve(payload)
      }
    }

    ev.on('data:auth', listener)
  })
}
