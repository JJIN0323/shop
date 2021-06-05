import React, { useState, useEffect } from 'react'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import ProductDetailInfo from './Sections/ProductDetailInfo'
import axios from 'axios'
import { Row, Col } from 'antd'

function DetailProductPage(props) {

    const [Product, setProduct] = useState({})

    const productId = props.match.params.productId

    useEffect(() => {

        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
            if (response.data.success) {
                setProduct(response.data.product[0])
                console.log('response.data', response.data)
            } else {
                alert('Failed to load product details.')
            }
        })
    
    }, [])

    return (
        <div className='container'>
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo detail={Product} />
                </Col>
            </Row>
            <ProductDetailInfo detail={Product} />
        </div>
    )
}

export default DetailProductPage
