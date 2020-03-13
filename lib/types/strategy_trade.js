'use strict'

/**
 * A trade performed by a strategy
 *
 * @typedef StrategyTrade
 * @property {string} symbol - symbol
 * @property {string} label - informative label shown in generated strategy
 *   results
 * @property {string} tag - like label, but meant to be used internally for
 *   identifying the nature of the trade (i.e. 'rsi-high', etc)
 * @property {number} amount - amount
 * @property {number} price - price
 * @property {number} pl - profit/loss relative to prior trades made on the
 *   same symbol
 * @property {number} mts - creation timestamp
 * @property {number} mtsCreate - order creation timestamp
 * @property {number} orderID - ID of the trade's order
 * @property {number} orderPrice - price of the trade's order
 * @property {string} orderStatus - status of the trade's order
 * @property {object} orderJS - POJO of the trade's order
 * @property {boolean} maker - true if the trade inserted an order into the book
 * @property {number} fee - fee amount
 * @property {string} feeCCY - fee currency
 * @property {string} positionID - ID of position the trade affected, if any
 * @property {object} iv - indicator values at the moment the trade was created
 */
