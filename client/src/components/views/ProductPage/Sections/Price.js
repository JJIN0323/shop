import React, { useState } from 'react'
import { Radio } from 'antd'

function Price(props) {

    const [Value, setValue] = useState(0)

    const renderPriceList  = () => props.list && props.list.map((value, index) => (
        <Radio key={index} value={value._id}>{value.name}</Radio>
    ))
    
    const handleActive = (event) => {
        setValue(event.target.value)
        props.checkFilters(event.target.value)
    }

    return (
        <Radio.Group onChange={handleActive} value={Value} className='alignRight'>
            {renderPriceList()}
        </Radio.Group>
    )
}

export default Price
