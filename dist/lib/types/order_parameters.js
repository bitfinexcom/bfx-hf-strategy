'use strict';
/**
 * Parameters defining an atomic order
 *
 * @typedef {object} OrderParameters
 * @property {number} [id] - ID
 * @property {number} [gid] - group ID
 * @property {number} [cid] - client ID
 * @property {number} [mtsTIF] - TIF timestamp
 * @property {number} [flags] - order flags
 * @property {string} [tag] - string rendered in execution results, and
 *   attached to the trade associated with the order. used for specifying meta
 *   information about the order i.e. event that triggered it. Identical tags
 *   are grouped together in execution results
 * @property {string} [label] - rendered in the Bitfinex UI
 * @property {number} price - desired excution price, required even for
 *   `MARKET` orders in order to have a fill price when backtesting.
 * @property {string} [priceTrailing] - trailing distance for TRAILING STOP
 *   orders
 * @property {string} [priceAuxLimit] - stop price for STOP LIMIT and OCO
 *   orders
 * @property {number} amount - order amount
 * @property {string} [type] - i.e. stop, stop-limit. May be required if using
 *   an order creation method that does not set it
 * @property {string} [affiliateCode] - affiliate code
 * @property {number} [lev] - leverage
 */