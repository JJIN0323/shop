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
                <img style={{width: '100%'}}
                     src={`/images/hanen-souhail-OL9b_8q2m0k-unsplash.jpg`} alt='unsplash' />
                <img style={{width: '100%'}}
                    src={`/images/pooja-chaudhary-q29kexdHODM-unsplash.jpg`} alt='unsplash' />
                <img style={{width: '100%'}}
                    src={`/images/saskia-fairfull-rkwtlUavj7w-unsplash.jpg`} alt='unsplash' />
                <img style={{width: '100%'}}
                    src={`/images/hanna-postova-xU34s6wuxyU-unsplash.jpg`} alt='unsplash' />
            </Carousel>
            
        </div>
    )
}

export default LandingPage
