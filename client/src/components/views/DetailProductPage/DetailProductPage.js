import React, { useEffect } from 'react'
import axios from 'axios'

function DetailProductPage(props) {

    const productId = props.match.params.productId

    useEffect(() => {

        axios.get(`/api/product/products_id?id=${productId}&type=single`)
        .then(response => {
            if (response.data.success) {
                alert('success')
            } else {
                alert('failed')
            }
        })
    
    }, [])

    return (
        <div className='container'>
            DetailProductPage  
        </div>
    )
}

export default DetailProductPage