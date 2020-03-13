'use strict'

const debug = require('debug')('bfx:hf:strategy:orders:submit')
const { submitOrder } = require('bfx-api-node-core')
const { nonce } = require('bfx-api-node-util')
const Promise = require('bluebird')

/**
 * @param {object} strategyState
 * @param {object|Array|Order} order
 * @return {Promise} p - resolves to full Order model
 */
module.exports = async (strategyState = {}, order = {}) => {
  const { ws } = strategyState
  const { amount, price, type } = order
  const { ev } = ws

  if (!order.meta) {
    order.meta = {}
  }

  order.cid = nonce()
  order.meta._HF = 1

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
