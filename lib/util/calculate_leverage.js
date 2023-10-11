'use strict'

const { MARGIN_WALLET_TYPE, EXCHANGE_DEFAULT_LEVERAGE } = require('../constants')

module.exports = (args) => {
  const {
    leverage: userLeverage, increaseLeverage, useMaxLeverage,
    maxLeverage, wallets, quoteCurrency, amount, price, backtesting
  } = args

  // maximum leverage from pair config
  if (useMaxLeverage) {
    return maxLeverage
  }

  // when backtesting use leverage set by user or default
  if (backtesting) {
    return userLeverage || EXCHANGE_DEFAULT_LEVERAGE
  }

  // get available balance for the quote currency
  const balance = getBalance(wallets, quoteCurrency)
  if (!balance) { throw new Error('Not enough balance for this trade') }

  // order amount in base currency. find min leverage as per user balance
  const minLeverage = Math.ceil((amount * price) / balance)
  let orderLeverage
  if (!userLeverage && EXCHANGE_DEFAULT_LEVERAGE >= minLeverage) {
    orderLeverage = EXCHANGE_DEFAULT_LEVERAGE // use default if not set
  } else if (userLeverage && userLeverage >= minLeverage) {
    orderLeverage = userLeverage
  } else if (userLeverage && increaseLeverage && minLeverage <= maxLeverage) {
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
