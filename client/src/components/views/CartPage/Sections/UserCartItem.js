import React from 'react'
import { Button } from 'antd'

function UserCartItem(props) {

    // image가 한개 이상일 경우엔, 첫번째 이미지만 넣어줌
    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    // 10% 할인된 가격 및 원화표기
    const renderPrice = (price) => {
        const salePrice = price * 0.9
        //console.log('price ', price)
        const totalPrice = salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        return totalPrice
    }

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <div className='cartImg'>
                        <img src={renderCartImage(product.images)} alt={product.subject} />
                    </div>
                </td>
                <td>
                    <a href={`/product/shop/${product._id}`}>
                        {product.subject}
                    </a>
                </td>
                <td>{product.quantity} EA</td>
                <td>{renderPrice(product.price)}원</td>
                <td><Button onClick={() => props.removeProduct(product._id)}>Remove</Button></td>
            </tr>
        ))
    )

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={2}>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>From Cart</th>
                </tr>
            </thead>
            <tbody>
                {renderItems()}
            </tbody>
        </table>
    )
}

export default UserCartItem
