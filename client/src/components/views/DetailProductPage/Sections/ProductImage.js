import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery'

function ProductImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            
            let images = []
            
            props.detail.images.map(item => {
                images.push({
                    original: `http://localhost:5000/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail]) // props.detail이 바뀔 때 마다, Lifecycle(useEffect)를 실행

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage
