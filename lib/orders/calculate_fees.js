const BigNumber = require('bignumber.js')

/**
 * @param {RESTv2} rest
 * @param {Order} order
 * @param {Object} orderParams
 * @returns {Promise<{ amount: BigNumber, cost: BigNumber, currency: string, perc: BigNumber, isMaker: boolean }>}
 */
module.exports = async (rest, order, orderParams) => {
  const { symbol, submittedAt } = orderParams
  let trades
  try {
    trades = await rest.accountTrades(symbol, submittedAt)
  } catch (e) {
    return null
  }
  const tradeForOrder = trades.find(t => t.orderID === order.id)

  if (!tradeForOrder) {
    return null
  }

  const execAmount = new BigNumber(tradeForOrder.execAmount)
  const execPrice = new BigNumber(tradeForOrder.execPrice)
  const amount = new BigNumber(tradeForOrder.fee)
  const isMaker = tradeForOrder.maker
  const currency = tradeForOrder.feeCurrency

  const cost = execAmount.isGreaterThan(0)
    ? amount.multipliedBy(execPrice)
    : amount

  const perc = execAmount.isGreaterThan(0)
    ? amount.dividedBy(execAmount).abs()
    : amount.dividedBy(execAmount.multipliedBy(execPrice))

  return {
    amount,
    cost,
    currency,
    perc,
    isMaker
  }
}
