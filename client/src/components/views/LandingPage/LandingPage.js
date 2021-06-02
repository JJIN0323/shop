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
                <img src={`/images/sarah-dorweiler-x2Tmfd1-SgA-unsplash.jpg`} alt='unsplash' />
                <img src={`/images/pawel-czerwinski-lWBZ01XRRoI-unsplash.jpg`} alt='unsplash' />
                <img src={`/images/sarah-dorweiler-9Z1KRIfpBTM-unsplash.jpg`} alt='unsplash' />
                <img src={`/images/sarah-dorweiler-2s9aHF4eCjI-unsplash.jpg`} alt='unsplash' />
            </Carousel>            
        </div>
    )
}

export default LandingPage
