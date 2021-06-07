import React from 'react'
import { Button } from 'antd'

function ProductInfo(props) {

    const salePrice = props.detail.price * 0.9
    const totalPrice = salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    const CartHandler = (event) => {

    }

    return (
        <div className='productInfo'>

            <div className='productTitle'>
                {props.detail.subject}
            </div>
            <div className='productOriginalPrice'>
                {props.detail.price}
                </div>
            <div className='productSalePrice'>
                {`${totalPrice}`}
            </div>

            <div className='productOptions'>
                <dl>
                    <dt>Views</dt>
                    <dd>{props.detail.views}</dd>
                </dl>
                <dl>
                    <dt>Color</dt>
                    <dd>{props.detail.color}</dd>
                </dl>
                <dl>
                    <dt>Meterial</dt>
                    <dd>{props.detail.material}</dd>
                </dl>
                <dl>
                    <dt>Weight</dt>
                    <dd>{props.detail.weight}</dd>
                </dl>
            </div>

            <div className='productDetail'>
                {props.detail.productDetail}
            </div>

            <div className=''>
                <Button className='grayButton' onClick={CartHandler}>ADD TO CART</Button>
                {/* <Button>BUY IT NOW</Button> */}
            </div>
        </div>
    )
}

export default ProductInfo
