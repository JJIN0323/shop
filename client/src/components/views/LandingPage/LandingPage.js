import React from 'react'
import { Carousel } from 'antd'

function LandingPage() {

    const [dotPosition, setDotPosition] = React.useState('right')

    const handlePositionChange = ({ target: { value } }) => { // because, warnings
        setDotPosition(value)
    }

    return (
        <div className='carousel' onChange={handlePositionChange}>
            <Carousel autoplay dotPosition={dotPosition}>
                <img src={`/images/daniil-silantev-nBuiLbz_j4A-unsplash.jpg`} alt='unsplash' />
                <img src={`/images/inside-weather-Uxqlfigh6oE-unsplash.jpg`} alt='unsplash' />
                <img src={`/images/nathan-oakley-bB6-yFYmShE-unsplash.jpg`} alt='unsplash' />
            </Carousel>            
        </div>
    )
}

export default LandingPage
