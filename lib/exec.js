'use strict'

const debug = require('debug')('hf:strategy:exec')
const { subscribe } = require('bfx-api-node-core')
const _isEmpty = require('lodash/isEmpty')

const {
  onSeedCandle, onCandle, onCandleUpdate, onTrade
} = require('./updates')

module.exports = (strategy = {}, wsManager = {}, args = {}) => {
  const { symbol, tf, includeTrades } = args
  const candleKey = `trade:${tf}:${symbol}`
  const messages = []
  let strategyState = strategy
  let lastCandle = null
  let processing = false

  const enqueMessage = (type, data) => {
    debug('enqueue %s', type)

    messages.push({ type, data })

    if (!processing) {
      processMessages().catch((err) => {
        debug('error processing: %s', err.stack)
      })
    }
  }

  const processMessage = async (msg) => {
    const { type, data } = msg

    switch (type) {
      case 'trade': {
        debug('recv trade: %j', data)
        strategyState = await onTrade(strategyState, data)
        break
      }

      case 'candle': {
        if (lastCandle === null || lastCandle.mts < data.mts) {
          debug('recv candle %j', data)
          strategyState = await onCandle(strategyState, data)
          lastCandle = data
        } else if (lastCandle.mts === data.mts) {
          debug('updated candle %j', data)
          strategyState = await onCandleUpdate(strategyState, data)
        }

        break
      }

      default: {
        debug('unknown message type: %s', type)
        throw new Error(`unknown message type: ${type}`)
      }
    }
  }

  const processMessages = async () => {
    processing = true

    while (!_isEmpty(messages)) {
      const [ msg ] = messages.splice(0, 1)

      await processMessage(msg)
    }

    processing = false
  }


  if (includeTrades) {
    wsManager.onWS('trades', { symbol }, async (trades) => {
      if (trades.length > 1) { // we don't pass snapshots through
        return
      }

      const [trade] = trades
      enqueMessage('trade', trade)
    })
  }

  wsManager.onWS('candles', { key: candleKey }, async (candles) => {
    if (candles.length > 1) {
      for (let i = 0; i < candles.length; i += 1) {
        candles[i].symbol = symbol
        candles[i].tf = tf

        strategyState = await onSeedCandle(strategyState, candles[i])
      }

      debug('seeded with %d candles', candles.length)
    } else {
      const [candle] = candles
      candle.symbol = symbol
      candle.tf = tf

      enqueMessage('candle', candle)
    }
  })

  wsManager.withSocket((socket) => {
    let nextSocket = subscribe(socket, 'candles', { key: candleKey })

    if (includeTrades) {
      nextSocket = subscribe(nextSocket, 'trades', { symbol })
    }

    return nextSocket
  })
}