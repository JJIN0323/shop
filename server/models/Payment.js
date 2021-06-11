const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

const paymentSchema = mongoose.Schema({
   user: {
       type: Array,
       default: []
   },
   data: {
        type: Array,
        default: []
   },
   product: {
        type: Array,
        default: []
   }
}, { timestamps: true, default: () => moment().format('LLL') })


const Payment = mongoose.model('Payment', paymentSchema)

module.exports = { Payment }