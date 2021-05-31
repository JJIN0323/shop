import React from 'react'
import { Carousel } from 'antd'

function ImageSlider(props) {
    return (
        <>
            <Carousel>
                {props.images.map((image, index) => {
                    return <div key={index}>
                        <img style={{width: '200px'}} 
                             src={`http://localhost:5000/${image}`} alt='test' />
                        </div>
                })}
            </Carousel>
        </>
    )
}

export default ImageSlider
