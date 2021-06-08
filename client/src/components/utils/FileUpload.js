import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { message } from 'antd'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsCloudUpload } from 'react-icons/bs'

function FileUpload(props) {

    const [UploadImages, setUploadImages] = useState([])

    const uploadHandler = (files) => {

        let formData = new FormData()

        const config = {
            // 파일의 확장자(타입) 정의
            header: {'content-type': 'multipart/form-data'}
        }
        // 업로드한 이미지들을 합쳐서 보냄
        formData.append('file', files[0], files[0].name)

        axios.post('/api/product/images', formData, config)
        .then(response => {
            if (response.data.success) {
                //console.log(response.data)
                setUploadImages([...UploadImages, response.data.image])
                // UploadProductPage 컴포넌트에 이미지 업로드 사항 전달
                props.refreshFunction([...UploadImages, response.data.image])
                
            } else {
                message.error('Error.')
            }
        })
    }

    const deleteHandler = (image) => {

        const currentIndex = UploadImages.indexOf(image)
        //console.log('curruntIndex', currentIndex)
        
        // 새로운 이미지들로 저장
        let newImages = [...UploadImages]
        newImages.splice(currentIndex, 1)
        // UploadProductPage 컴포넌트에 이미지 삭제 전달
        props.refreshFunction(newImages)

        message.error('Are you sure you want to delete it?')

        setUploadImages(newImages)
    }

    return (
        <div className='uploadBox'>
            <Dropzone onDrop={uploadHandler}>
            {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    
                    <div className='uploadFileBox'>
                        <BsCloudUpload className='uploadBoxIcon' />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                </div>
            )}
            </Dropzone>

            {UploadImages.map((image, index) => (
                <div className='uploadFile' key={index}>
                    <span className='uploadFileName'>{image}</span>
                    <AiOutlineDelete className='uploadFileDelete' onClick={() => deleteHandler(image)}/>
                </div>
            ))}
        </div>
    )
}

export default FileUpload
