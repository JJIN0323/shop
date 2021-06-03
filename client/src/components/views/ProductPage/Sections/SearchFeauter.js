import React, { useState } from 'react'
import { Input } from 'antd'

const { Search } = Input

function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState('')

    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
            <Search
                className='searchBox'
                placeholder="Search in shop"
                onChange={searchHandler}
                value={SearchTerm}
            />
        </div>
    )
}

export default SearchFeature
