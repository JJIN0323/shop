import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Row, Col } from 'antd'

function ProductPage() {

    const { Meta } = Card

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostAmount, setPostAmount] = useState()

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostAmount(response.data.postSize)
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.")
                }
            })
    }

    const loadMoreHanlder = () => {

        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} sm={24} key={index}>
            <Card style={{width: '50%', height: '320px', marginBottom: '2rem'}}
                cover={<img src={`http://localhost:5000/${product.images}`} alt='test' />}>
                <Meta title={product.title} description={product.productDetail} />
            </Card>
        </Col>
    })

    return (
        <div className='container'>

            <p className='subTitle'>category name</p>

            {/* Filter */}

            {/* Search */}

            {/* Cards - Helper method를 이용해서 function을 불러옴 */}
            <Row>
                {renderCards}
            </Row>

            <div>
                {PostAmount >= Limit && 
                <button className='grayButton' onClick={loadMoreHanlder}>MORE</button>
                }
                
            </div>
        </div>
    )
}

export default ProductPage
