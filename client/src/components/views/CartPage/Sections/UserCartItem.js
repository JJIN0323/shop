import React from 'react'
import { Button } from 'antd'
import commaNumber from 'comma-number'

function UserCartItem(props) {

    // image가 한개 이상일 경우엔, 첫번째 이미지만 넣어줌
    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <a href={`/product/shop/${product._id}`} className='cartImg'>
                        <img src={renderCartImage(product.images)} alt={product.subject} />
                    </a>
                </td>
                <td>
                    <a href={`/product/shop/${product._id}`} className='displayNone'>
                        {product.subject}
                    </a>
                </td>
                <td>{product.quantity} EA</td>
                <td>{commaNumber(product.price * 0.9)}원</td>
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
