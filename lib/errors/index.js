// @create-index

const throwIfOrderClosesPosition = require('./throw_if_order_closes_position.js')
const throwIfPositionOpen = require('./throw_if_position_open.js')

module.exports = {
  throwIfOrderClosesPosition,
  throwIfPositionOpen
}
