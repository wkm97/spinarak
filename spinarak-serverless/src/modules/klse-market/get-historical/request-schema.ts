export default {
  type: "object",
  properties: {
    stockcode: { type: 'integer' },
    fromDate: {type: 'string', format: 'date'},
    toDate: {type: 'string', format: 'date'}
  },
  required: ['stockcode']
} as const;