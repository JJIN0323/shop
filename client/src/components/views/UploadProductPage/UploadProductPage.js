import React, { useState } from 'react'
import FileUpload from '../../utils/FileUpload'
import { Form, Input, Button } from 'antd'
import axios from 'axios'

const formItemLayout = {
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 18 },
    },
}

function UploadProductPage(props) {

    const { TextArea } = Input

    const OptionTypes = [
        { key: 1, value: 'Sale' },
        { key: 2, value: 'Sold Out' },
        { key: 3, value: 'Ready to restock' }
    ]

    // 서버로 보내야할 정보들
    const [Subject, setSubject] = useState('')
    const [ProductDetail, setProductDetail] = useState('')
    const [Price, setPrice] = useState(0)
    const [OptionValue, setOptionValue] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [UploadImages, setUploadImages] = useState([])

    const subjectChangeHandler = (event) => {
        setSubject(event.currentTarget.value)
    }

    const ProductDetailChangeHandler = (event) => {
        setProductDetail(event.currentTarget.value)
    }

    const PriceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const OptionValueChangeHandler = (event) => {
        setOptionValue(event.currentTarget.value)
        //console.log(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        // refreshFunction={updateImages}를 전달 받음
        setUploadImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault()

        if(!Subject || !ProductDetail || !Price || !OptionValue || !UploadImages) {
            return alert('Please fill in all fields.')
        }

        // 적용된 필드의 값들을 서버에 Request로 보냄

        const fields = {
            // hoc에서 사용자 정보를 불러오기
            writer: props.user.userData._id,
            subject: Subject,
            productDetail: ProductDetail,
            price: Price,
            optionTypes: OptionTypes,
            images: UploadImages
        }

        axios.post('/api/product', fields)
        .then(response => {
            if(response.data.success) {
                alert('Product upload was successful.')
                props.history.push('/product/shop')
            } else {
                alert('Product upload failed.')
            }
        })
    }

    return (
        <div className='container'>
            <Form style={{ minWidth: '290px' }} {...formItemLayout} onSubmit={submitHandler}>

              {/* Image upload */}
              <Form.Item>
                <FileUpload refreshFunction={updateImages} />
              </Form.Item>

              <Form.Item>
                 <p className='formLable'>Subject</p>
                <Input
                  id='subject'
                  onChange={subjectChangeHandler}
                  value={Subject} />
              </Form.Item>

              <Form.Item>
                <p className='formLable'>Price</p>
                <Input
                  id='price'
                  onChange={PriceChangeHandler}
                  value={Price} />
              </Form.Item>

              <Form.Item>
                <p className='formLable'>Product Detail</p>
                <TextArea 
                  rows={4} 
                  onChange={ProductDetailChangeHandler}
                  value={ProductDetail} />
              </Form.Item>

              <Form.Item>
                <p className='formLable'>Status</p>
                <select onChange={OptionValueChangeHandler} value={OptionValue}>
                    {OptionTypes.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
              </Form.Item>

              <Form.Item>
                  <Button className='grayButton' type='submit' onClick={submitHandler}>
                    UPLOAD
                </Button>
              </Form.Item>
            </Form>
        </div>
    )
}

export default UploadProductPage