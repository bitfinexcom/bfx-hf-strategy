'use strict'

const Promise = require('bluebird')
const { submitOrder } = require('bfx-api-node-core')
const generateClientId = require('../util/generate_client_id')
const BigNumber = require('bignumber.js')
const debug = require('debug')('bfx:hf:strategy:orders:submit')

/**
 * @param {Object} strategyState
 * @param {Object|Array|Order} order
 * @return {Promise} p - resolves to full Order model
 */
module.exports = async (strategyState = {}, order = {}) => {
  const { gid, ws, perfManager, priceFeed } = strategyState
  const { amount, price, type } = order
  const { ev } = ws

  if (!order.meta) {
    order.meta = {}
  }

  order.cid = generateClientId()
  order.gid = +gid
  order.meta._HF = 1

  const authorizationError = perfManager.canOpenOrder(
    new BigNumber(amount),
    new BigNumber(price || priceFeed.price)
  )

  if (authorizationError) {
    throw authorizationError
  }

  debug('submitting order %f @ %f [%s]', amount, price, type)

  // Listen for 'oc' message to confirm order filled
  return new Promise((resolve, reject) => {
    submitOrder(ws, order).then((filledOrder) => {
      debug('order submitted')

      perfManager.addOrder({
        amount: new BigNumber(filledOrder.amount),
        price: new BigNumber(filledOrder.price)
      })
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
