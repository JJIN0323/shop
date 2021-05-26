import React from 'react'
import moment from 'moment'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { registerUser } from '../../../_actions/user_actions'
import { useDispatch } from 'react-redux'

import {
  Form,
  Input,
  Button,
} from 'antd'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
}
const buttonLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
}

function RegisterPage(props) {
  const dispatch = useDispatch()
  return (

    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('*Name is required'),
        lastName: Yup.string()
          .required('*Last Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('*Email is required'),
        password: Yup.string()
          .min(6, '*Password must be at least 6 characters')
          .required('*Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], '*Passwords must match')
          .required('*Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          }

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push('/login')
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false)
        }, 500)
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          //dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
          //handleReset,
        } = props
        return (
          <div className='container'>
            <div className='title'>Sign Up</div>
            <p className='subTitle'>Signing up for an account is free and easy.</p>
            <Form style={{ minWidth: '290px' }} {...formItemLayout} onSubmit={handleSubmit} >

              <Form.Item required>
                <Input
                  id='name'
                  placeholder='Name'
                  type='text'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className='feedback'>{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id='lastName'
                  placeholder='Last Name'
                  type='text'
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                  }
                />
                {errors.lastName && touched.lastName && (
                  <div className='feedback'>{errors.lastName}</div>
                )}
              </Form.Item>

              <Form.Item required hasFeedback> 
              {/* validateStatus={errors.email && touched.email ? 'error' : 'success'} */}
                <Input
                  id='email'
                  placeholder='Email'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className='feedback'>{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required hasFeedback>
                {/* validateStatus={errors.password && touched.password ? 'error' : 'success'} */}
                <Input
                  id='password'
                  placeholder='Password'
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className='feedback'>{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required hasFeedback>
                <Input
                  id='confirmPassword'
                  placeholder='confirmPassword'
                  type='password'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className='feedback'>{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...buttonLayout}>
                <Button onClick={handleSubmit} className='grayButton' disabled={isSubmitting}>
                  SUBMIT
                </Button>
              </Form.Item>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}


export default RegisterPage
