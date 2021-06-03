import React, { useState } from 'react'
import { Checkbox } from 'antd'

function Category(props) {

    const [Checked, setChecked] = useState([])  

    const handleToggle = (value) => {

         // checkbox의 index를 로드. Checked에 없는 값은 -1
         const currentIndex = Checked.indexOf(value)
         // Checked state
         const newChecked = [...Checked]
         if (currentIndex === -1) { // -1이라면 push로 value를 넣음
            newChecked.push(value)
         } else { // checked 되어 있다면 splice로 지움
             newChecked.splice(currentIndex, 1)
         }
         // 다시 state에 넣기
         setChecked(newChecked)
         props.checkFilters(newChecked)
    }

    const renderCategoryList = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox 
                onChange={() => handleToggle(value._id)}
                checked={Checked.indexOf(value._id) === -1 ? false : true}>
                {value.name}
            </Checkbox>
        </React.Fragment>
    ))

    return (
        <div>
            {renderCategoryList()}            
        </div>
    )
}

export default Category
