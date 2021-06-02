import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Row, Col, Button } from 'antd'

function ProductPage() {

    const { Meta } = Card

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0) //mongoDB method
    const [Limit, setLimit] = useState(8)
    const [PostAmount, setPostAmount] = useState(0)

    useEffect(() => {
        // 갯수 제한
        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body)
        //console.log('얍얍', body)
    }, [])

    const getProducts = (body) => {
        // 데이터베이스에 모든 정보를 가져옴
        axios.post('/api/product/products', body)
        .then(response => {
            if (response.data.success) {
                // 더보기 조건
                if (body.loadMore) {
                    setProducts([...Products, ...response.data.productInfo])
                    console.log('정상')
                } else {
                    setProducts(response.data.productInfo)
                    console.log('오류')
                }
                setPostAmount(response.data.postAmount)
                //console.log(response.data)                
            } else {
                alert('Failed to load product list.')
            }
        })
    }

    const moreHandler = () => {

        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip) // Skip 갯수를 저장
    }

    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} sm={24} key={index}>
            
            <Card className='GridItem'
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
                <Button className='grayButton' type='submit' onClick={moreHandler}>MORE</Button>
                }
                
            </div>
        </div>
    )
}

export default ProductPage
