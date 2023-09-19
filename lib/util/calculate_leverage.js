'use strict'

const { MARGIN_WALLET_TYPE } = require('../constants')

module.exports = (args) => {
  const {
    leverage: userLeverage, increaseLeverage, maxLeverage,
    wallets, quoteCurrency, baseCurrency, symbol, amount, price
  } = args

  // get available balance for the trading currency
  const currency = isQuoteCurrency(symbol, quoteCurrency) ? quoteCurrency : baseCurrency
  const balance = getBalance(wallets, currency)
  if (!balance) { throw new Error('Not enough balance for this trade') }

  // check if there is enough balance to use leverage set by user
  const minLeverage = currency === baseCurrency
    ? Math.ceil((amount * price) / balance)
    : Math.ceil(amount / balance)

  let orderLeverage
  if (userLeverage >= minLeverage) {
    orderLeverage = userLeverage
  } else if (increaseLeverage && minLeverage <= maxLeverage) {
    orderLeverage = minLeverage
  }

  if (!orderLeverage) { throw new Error('Not enough leverage for this trade') }

  return orderLeverage
}

const getBalance = (wallets, currency) => {
  // find derivative wallet balance for the currency
  const wallet = wallets.find(wallet => wallet.currency === currency && wallet.type === MARGIN_WALLET_TYPE)
  return wallet ? wallet.balanceAvailable : 0
}

const isQuoteCurrency = (symbol, currency) => {
  return symbol.endsWith(currency)
}
