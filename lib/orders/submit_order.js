'use strict'

const Promise = require('bluebird')
const { submitOrder } = require('bfx-api-node-core')
const generateClientId = require('../util/generate_client_id')
const debug = require('debug')('bfx:hf:strategy:orders:submit')

/**
 * @param {Object} strategyState
 * @param {Object|Array|Order} order
 * @param {Boolean} waitToClose
 * @return {Promise} p - resolves to full Order model
 */
module.exports = async (strategyState = {}, order = {}, waitToClose = true) => {
  const { id, gid, scope, ws, perfManager, priceFeed } = strategyState
  const { amount, price, type } = order
  const { ev } = ws

  if (!order.meta) {
    order.meta = {}
  }

  order.cid = generateClientId()
  order.gid = +gid
  order.meta = {
    ...order.meta,
    _HF: 1,
    scope,
    strategy_id: id,
    strategy_gid: +gid
  }

  const authorizationError = perfManager.canOpenOrder(amount, price || priceFeed.price)

  if (authorizationError) {
    throw authorizationError
  }

  debug('submitting order %f @ %f [%s]', amount, price, type)

  // Listen for 'oc' message to confirm order filled
  return new Promise((resolve, reject) => {
    submitOrder(ws, order).then((orderData) => {
      debug('order submitted', orderData.id)
      if (!waitToClose) {
        resolve(orderData)
      }
    }).catch((err) => {
      debug('error submitting order: %s', err)
      if (waitToClose && listener) {
        ev.off('data:auth', listener)
      }
      reject(err)
    })

    let listener
    if (waitToClose) {
      listener = (data = []) => {
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
    }
  })
}
