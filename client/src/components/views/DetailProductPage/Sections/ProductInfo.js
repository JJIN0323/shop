import React from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../../_actions/user_actions'
import { Button, message } from 'antd'
import commaNumber from 'comma-number'

function ProductInfo(props) {

    const dispatch = useDispatch()

    const CartHandler = () => {

        // Redux를 이용해서, 필요한 정보를 Cart field에 저장
        dispatch(addToCart(props.detail._id)).then(response => {
            if (response.payload.length > 0 ) {
                //props.history.push('/user/cart')
                message.success('Add to Cart Success.')
                //console.log('success', response.payload)
            } else {
                message.error('Sign In is required.')
                //console.log('error', response.payload)
            }
        })
    }

    return (
        <div className='productInfo'>
            <div className='productTitle'>
                {props.detail.subject}
            </div>
            <div className='productOriginalPrice'>
                {commaNumber(props.detail.price)}
                </div>
            <div className='productSalePrice'>
                {commaNumber(props.detail.price * 0.9)}
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

            <Button className='grayButton' onClick={CartHandler}>ADD TO CART</Button>
            {/* <Button>BUY IT NOW</Button> */}

        </div>
    )
}

export default withRouter(ProductInfo)
