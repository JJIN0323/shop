const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: {
        type: String,
        maxlength:50
    },
    images: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        default: 0
    },
    productDetail: {
        type: String
    },
    status: {
        type: String
    },
    optionType: {
        type: String // array로 받아야하나?
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


const Product = mongoose.model('Product', productSchema)

module.exports = { Product }