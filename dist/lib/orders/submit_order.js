'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const _require = require('bfx-api-node-core'),
      submitOrderViaAPI = _require.submitOrder;

const debug = require('debug')('bfx:hf:strategy:orders:submit');

const _require2 = require('bfx-api-node-util'),
      nonce = _require2.nonce;

const _Promise = require('bluebird');
/**
 * Submit an order using either a Bitfinex array-format order, order model
 * instance, or a raw order parameters object.
 *
 * @param {StrategyState} state - strategy state
 * @param {object|Array|bfx-api-node-models.Order} order - order or order
 *   parameters
 * @returns {Promise} p - resolves to full Order model
 */


const submitOrder = (state = {}, order = {}) => {
  var ws, amount, price, type, ev;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        ws = state.ws;
        amount = order.amount, price = order.price, type = order.type;
        ev = ws.ev;

        if (!order.meta) {
          order.meta = {};
        }

        order.cid = nonce();
        order.meta._HF = 1;
        debug('submitting order %f @ %f [%s]', amount, price, type); // Listen for 'oc' message to confirm order filled

        return _context.abrupt("return", new Promise((resolve, reject) => {
          submitOrderViaAPI(ws, order).then(() => {
            // eslint-disable-line
            debug('order submitted');
          }).catch(err => {
            debug('error submitting order: %s', err);
            ev.off('data:auth', listener);
            reject(err);
          });

          const listener = (data = []) => {
            const _data = _slicedToArray(data, 3),
                  type = _data[1],
                  payload = _data[2];

            if (type !== 'oc') {
              return;
            }

            const cid = payload.cid;

            if (cid === order.cid) {
              debug('received order close');
              ev.off('data:auth', listener);
              resolve(payload);
            }
          };

          ev.on('data:auth', listener);
        }));

      case 8:
      case "end":
        return _context.stop();
    }
  }, null, null, null, Promise);
};

module.exports = submitOrder;