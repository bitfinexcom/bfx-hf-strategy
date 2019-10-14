module.exports = () => ({
  label: 'EMA Cross',
  id: 'bfx-strategy-ema-cross',

  connectionTimeout: 10000,
  actionTimeout: 10000,

  sections: [{
    title: '',
    name: 'general',
    rows: [
      ['emaLPeriod', 'emaSPeriod'],
      ['amount', null],
      ['action', null]
    ]
  }],

  fields: {
    emaLPeriod: {
      component: 'input.number',
      label: 'Long EMA Period',
      default: 100,
      customHelp: 'Set the period for the long EMA'
    },

    emaSPeriod: {
      component: 'input.number',
      label: 'Short EMA Period',
      default: 20,
      customHelp: 'Set the period for the short EMA'
    },

    amount: {
      component: 'input.amount',
      label: 'Amount $BASE',
      customHelp: 'Total order amount'
    },

    action: {
      component: 'input.radio',
      label: 'Action',
      options: ['Buy', 'Sell'],
      inline: true,
      default: 'Buy'
    }
  },

  actions: ['submit']
})
