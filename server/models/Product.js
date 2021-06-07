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
        type: String
    },
    categoryList: {
        type: Number,
        default: 1
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    color: {
        type: String
    },
    material : {
        type: String
    },
    weight: {
        type: String
    }
}, { timestamps: true })

productSchema.index({
    subject: 'text',
    productDetail: 'text'
}, {
    weights: {
        subject: 5, // 5배정도 중요
        productDetail: 1
    }
})


const Product = mongoose.model('Product', productSchema)

module.exports = { Product }