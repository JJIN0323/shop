import React, { useState, useEffect } from 'react'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import axios from 'axios'
import { Row, Col, message } from 'antd'

function DetailProductPage(props) {

    const [Product, setProduct] = useState({})
    const [Views, setViews] = useState({})
    
    const productId = props.match.params.productId

    useEffect(() => {

        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
            if (response.data.success) {
                setProduct(response.data.product[0])
                //console.log('response.data', response.data)
            } else {
                message.error('Failed to load product details.')
            }
        })

        axios.post(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
            if (response.data.success) {
                setViews(response.data.product)
                //console.log('response.data', response.data.views)
            } else {
                message.error('Failed to load view.')
            }
        })
    
    }, [])

    return (
        <div className='container'>
            <Row gutter={[16, 16]}>
                <Col lg={8} xs={24}>
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={16} xs={24}>
                    <ProductInfo detail={Product} views={Views} />
                </Col>
            </Row>
        </div> 
    )
}

export default DetailProductPage
