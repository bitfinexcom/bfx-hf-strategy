/**
 * @param {RESTv2} rest
 * @param {Order} order
 * @param {Object} orderParams
 * @returns {Promise<void>}
 */
module.exports = async (rest, order, orderParams) => {
  const { symbol, submittedAt } = orderParams
  const trades = await rest.accountTrades(symbol, submittedAt)
  const tradeForOrder = trades.find(t => t.orderID === order.id)

  if (!tradeForOrder) {
    return null
  }

  const {
    execAmount,
    execPrice,
    maker: isMaker,
    fee: amount,
    feeCurrency: currency
  } = tradeForOrder

  console.log('@@fees', {
    execAmount,
    execPrice,
    isMaker,
    amount,
    currency
  })

  const cost = amount * execPrice
  const perc = Math.abs(amount / execAmount)

  return {
    amount,
    cost,
    currency,
    perc,
    isMaker
  }
}
