import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem } from '../../../_actions/user_actions'
import UserCartItem from './Sections/UserCartItem'
import Paypal from '../../utils/Paypal'
import commaNumber from 'comma-number'

function CartPage(props) {

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {

        let cartItems = []
        
        // Redux - User state cart 안에 상품이 있는지 확인
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                //.then(response => console.log(response))
                .then(response => {sumPrice(response.payload.product) })
            }
        }
    }, [props.user.userData]) // props.user.userData이 바뀔 때 마다, Lifecycle(useEffect)를 실행

    // Cart에 담긴 상품들의 합계
    let sumPrice = (cartDetail) => {
        let total = 0

        cartDetail.map(item => {
            const itemPrice = item.price * 0.9
            total += parseInt(itemPrice, 10) * item.quantity
        })

        setTotal(commaNumber(total))
        setShowTotal(true)
    }

    let removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
        .then(response => {
            //console.log(response)
            if (response.payload.productInfo.length <= 0) {
                setShowTotal(false)
            }
        })
    }

    return (
        <div className='container'>

            <UserCartItem products={props.user.cartDetail && props.user.cartDetail.product} removeProduct={removeFromCart} />

            {ShowTotal ? 
            <div className='cartTotal'>
                ₩ <span className='cartTotalPrice'>{Total}</span>
            </div> : <div className='noMessage'>No products in the cart</div>}

            {ShowTotal && <Paypal /> }
            

        </div>
        
    )
}

export default CartPage
