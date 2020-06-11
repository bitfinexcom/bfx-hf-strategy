'use strict'

/**
 * An object representing a strategy position in a market, including all
 * relevant {@link StrategyTrade|trades}.
 *
 * @typedef {object} StrategyPosition
 * @property {string} symbol - symbol
 * @property {number} price - current base price
 * @property {number} amount - total position amount
 * @property {StrategyTrade[]} trades - all trades relevant to this position,
 *   in order of execution.
 * @property {string} [tag] - metadata accessible at runtime
 */

