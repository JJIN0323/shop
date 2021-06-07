import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery'

function ProductImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            
            let images = []
            
            // 반환된 배열을 사용하지 않기 때문에, map() 대신 forEach()를 사용
            props.detail.images.forEach(item => {
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
