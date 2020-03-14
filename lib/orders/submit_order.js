'use strict'

const { submitOrder: submitOrderViaAPI } = require('bfx-api-node-core')
const debug = require('debug')('bfx:hf:strategy:orders:submit')
const { nonce } = require('bfx-api-node-util')
const Promise = require('bluebird')

/**
 * Submit an order using either a Bitfinex array-format order, order model
 * instance, or a raw order parameters object.
 *
 * @memberOf module:Orders
 * @private
 *
 * @param {StrategyState} state - strategy state
 * @param {object|Array|Order} order - order to generate parameters or order
 *   parameters themselves
 * @returns {Promise} p - resolves to full Order model
 */
const submitOrder = async (state = {}, order = {}) => {
  const { ws } = state
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
    submitOrderViaAPI(ws, order).then(() => { // eslint-disable-line
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

module.exports = submitOrder
