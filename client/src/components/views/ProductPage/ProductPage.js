import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { categoryList, price } from './Sections/Datas'
import Category from './Sections/Category'
import Price from './Sections/Price'
import SearchFeauter from './Sections/SearchFeauter'
import { Card, Row, Col, Button, message } from 'antd'

function ProductPage() {

    const { Meta } = Card

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0) // mongoDB method
    const [Limit, setLimit] = useState(8) // setLimit ... 
    const [PostAmount, setPostAmount] = useState(0)
    const [Filters, setFilters] = useState({
        categoryList: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState('')
   

    useEffect(() => {
        // 갯수 제한
        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body)
        //console.log('getProducts', body)
    }, [])

    const getProducts = (body) => {
        // 데이터베이스에 모든 정보를 가져옴
        axios.post('/api/product/products', body)
        .then(response => {
            if (response.data.success) {
                // 더보기 조건
                if (body.loadMore) {
                    setProducts([...Products, ...response.data.productInfo])
                    //console.log('더보기 눌렀을 때 작동해야 정상')
                } else {
                    setProducts(response.data.productInfo)
                    //console.log('페이지 로딩했을 때 한번만 작동해야 정상')
                }
                setPostAmount(response.data.postAmount)
                //console.log(response.data)                
            } else {
                message.error('Failed to load product list.')
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

        //const priceKRW = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") // {`${priceKRW}`}

        return <Col lg={6} md={8} sm={12} xs={24} key={index} className='cardItem'>
            
            <Card
                cover={<a href={`/product/shop/${product._id}`} >
                          <img className='cardItemImg' src={`http://localhost:5000/${product.images[0]}`} alt={product.subject} />
                      </a>}>
                    <Meta title={product.subject} description={product.productDetail} />
            </Card>
        </Col>
    })

    //console.log('renderCards', renderCards)

    const showFilteredResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price
        let array = []

        //console.log('DATA', data)

        for (let key in data) {
            if (data[key]._id === value) { // parseInt(value, 10))
                array = data[key].array
            }
            //console.log('array : ', array)
        }
        return array
    }

    const checkFilters = (filters, category) => {

        const newFilters = {...Filters}

        // Filters state 안에 categoryList / priceList Array를 봄
        newFilters[category] = filters
        //console.log('filters value', filters)

        if (category === 'price') {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        // getProducs를 다시 불러옴
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }

    return (
        <div className='container'>

            <p className='subTitle'>interior decoration</p>

            {/* FILTERS - category & price */}
            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    <Category className='filterCategory' list={categoryList} checkFilters={filters => checkFilters(filters, 'categoryList')} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* <Slider className='filterPrice' defaultValue={30} tooltipVisible /> */}
                    <Price list={price} checkFilters={filters => checkFilters(filters, 'price')} />
                </Col>
            </Row>

            {/* SEARCH */}
            <SearchFeauter refreshFunction={updateSearchTerm} />

            {/* CARDS - Helper method를 이용해서 function을 불러옴 */}
            { renderCards[0] ? <Row>
                {renderCards}
            </Row> : <div className='noMessage'>No search result</div> }
            

            {/* MORE BUTTON */}
            {PostAmount >= Limit && 
                <Button className='grayButton' type='submit' onClick={moreHandler}>MORE</Button>
            }
        </div>
    )
}

export default ProductPage
