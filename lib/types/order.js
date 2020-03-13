'use strict'

/**
  * An atomic order
  *
  * @typedef Order
  * @property {number} id - ID
  * @property {number} gid - group ID
  * @property {number} cid - client ID
  * @property {string} symbol - symbol
  * @property {number} mtsCreate - creation timestamp
  * @property {number} mtsUpdate - last update timestamp
  * @property {string} amount - remaining order amount
  * @property {string} amountOrig - original/initial order amount
  * @property {string} type - order type (i.e. 'EXCHANGE LIMIT')
  * @property {string} typePrev - previous order type, if any
  * @property {number} [mtsTIF] - TIF timestamp, if set
  * @property {number} flags - order flags
  * @property {string} status - current order status
  * @property {string} price - order price
  * @property {string} priceAvg - average execution price
  * @property {string} [priceTrailing] - trailing distance for TRAILING STOP orders
  * @property {string} [priceAuxLimit] - stop price for STOP LIMIT and OCO orders
  * @property {number|boolean} [notify] - notify flag
  * @property {number} [placedId] - placed ID
  * @property {string} [affiliateCode] - affiliate code
  * @property {object} [apiInterface] - saved for a later call to registerListeners()
  */
