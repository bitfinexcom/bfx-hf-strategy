'use strict';

const debug = require('debug')('bfx:hf:strategy:debug:log-trades');

const _isFinite = require('lodash/isFinite');

const _groupBy = require('lodash/groupBy');

const _require = require('sprintf-js'),
      sprintf = _require.sprintf;

const colors = require('colors/safe');

const Table = require('cli-table2');
/**
 * Prints strategy execution information to the console
 *
 * @param {StrategyState} strategy - strategy
 */


const logTrades = (strategy = {}) => {
  const _strategy$trades = strategy.trades,
        trades = _strategy$trades === void 0 ? [] : _strategy$trades,
        tf = strategy.tf; // Group trades by symbol for P/L calcs

  const symbolTrades = _groupBy(trades, 'symbol');

  const table = new Table({
    head: ['Date', 'Symbol', 'Direction', 'Amount', 'Price', 'Fee', 'P&L', 'Label'].map(title => colors.white(title)),
    colAligns: ['', '', 'middle', 'middle', 'right', 'right', 'right', 'left'],
    chars: {
      mid: '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': ''
    }
  });
  Object.keys(symbolTrades).forEach(symbol => {
    let plSum = 0;
    let volSum = 0;
    let feeSum = 0;
    let maxPL = -Infinity;
    let minPL = Infinity;
    let cl;
    let date;
    symbolTrades[symbol].forEach(t => {
      plSum += t.pl;
      volSum += _isFinite(t.price) ? Math.abs(t.price * t.amount) : 0;
      feeSum += t.fee;
      minPL = Math.min(minPL, t.pl);
      maxPL = Math.max(maxPL, t.pl);
      cl = t.pl === 0 ? colors.blue : t.pl > 0 ? colors.green : colors.red;
      date = new Date(t.mts).toLocaleString();
      table.push([date, t.symbol.substr(1), t.amount > 0 ? 'LONG' : 'SHORT', sprintf('%.2f', Math.abs(t.amount)), sprintf('%.2f', t.price), sprintf('%.2f', t.fee), (t.pl > 0 ? '+' : '') + sprintf('%.2f', t.pl), t.label || ''].map(row => cl(row)));
    }); // prints trades

    console.log(table.toString());
    const losses = trades.filter(t => t.pl < 0).map(t => t.pl);
    const gains = trades.filter(t => t.pl > 0).map(t => t.pl);
    const opens = trades.filter(t => t.pl === 0);
    const nTrades = trades.length;
    const totalGain = gains.reduce((pv, v) => pv + v, 0);
    const totalLoss = losses.reduce((pv, v) => pv + v, 0);
    const profitFactor = totalGain / Math.abs(totalLoss);
    console.log('');
    debug('strategy trades for %s:%s', symbol.substr(1), tf.toUpperCase());
    console.log('');
    debug(sprintf('P/L %.2f | Vol %.2f | Fees %.2f', plSum, volSum, feeSum));
    debug(sprintf('Min P/L %.2f | Max P/L %.2f | Avg P/L %.2f', minPL, maxPL, plSum / nTrades));
    debug(sprintf('Losses %d (total ~$%.2f) | Gains %d (total ~$%.2f)', losses.length, -totalLoss, gains.length, totalGain));
    debug(sprintf('Profit Factor: %.2f | %d Positions | %d Trades', profitFactor, opens.length, nTrades));
    console.log('');
  });
};

module.exports = logTrades;