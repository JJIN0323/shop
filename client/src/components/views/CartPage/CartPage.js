import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_actions'
import UserCartItem from './Sections/UserCartItem'
import Paypal from '../../utils/Paypal'
import commaNumber from 'comma-number'
import { Button, message } from 'antd'

function CartPage(props) {

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

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
            return total
        })

        setTotal(commaNumber(total))
        setShowTotal(true)
    }

    const HistoryHandler = () => {
        if (props.user.userData.history) {
            props.history.push('/user/history')
        } else {
            message.error('Failed to get History Infomation.')
        }
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

    const transactionSuccess = (data) => {
        dispatch(onSuccessBuy({
            paymentData : data,
            cartDetail: props.user.cartDetail
        }))
        .then(response => {
            if (response.payload.success) {
                setShowTotal(false)
                setShowSuccess(true)
            }
        })
    }

    //console.log('payment ', payment)

    return (
        <div className='container'>

           {ShowSuccess ? <></> :
            <UserCartItem products={props.user.cartDetail && props.user.cartDetail.product} removeProduct={removeFromCart} /> }

            {ShowTotal ? 
            <div className='cartBtn'>
                <Paypal total={Total} onSuccess={transactionSuccess} />
                <div className='cartTotal'>
                    ₩ <span className='cartTotalPrice'>{Total}</span>
                </div>
            </div> 
            : ShowSuccess ? 
            <div className='successMessage'>
                Purchase Success
                <span>What!!!!!!!!!!</span>
                <p className='total'>{Total}</p>
                <Button className='grayButton small' onClick={HistoryHandler}>HISTORY</Button>
            </div>
            : <div className='failMessage'>No products in the cart</div>}
            

            {/* {ShowTotal && <Paypal total={Total} onSuccess={transactionSuccess} /> } */}
            
            

        </div>
        
    )
}

export default CartPage
