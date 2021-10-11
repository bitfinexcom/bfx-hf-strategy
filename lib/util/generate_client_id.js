'use strict'

let lastClientId = Date.now()

/**
 * Generates a new client id for usage with the Bitfinex APIs
 *
 * @return {number} clientId
 */
const generateClientId = () => {
  const now = Date.now()
  lastClientId = (lastClientId < now) ? now : lastClientId + 1
  return lastClientId
}

module.exports = generateClientId
