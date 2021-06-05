import React from 'react'
import { Button, Descriptions } from 'antd'

function ProductInfo(props) {

    const CartHandler = (event) => {

    }

    return (
        <div>
            <Descriptions title="상품정보">
                <Descriptions.Item label="Subject">{props.detail.subject}</Descriptions.Item>
                <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
            </Descriptions>

            <Button onClick={CartHandler}>ADD TO CART</Button>
        </div>
    )
}

export default ProductInfo
