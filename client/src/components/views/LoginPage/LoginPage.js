import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { loginUser } from '../../../_actions/user_actions'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { useDispatch } from 'react-redux'

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

function LoginPage(props) {
  const dispatch = useDispatch()
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : ''

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('*Email is invalid')
          .required('*Email is required'),
        password: Yup.string()
          .min(6, '*Password must be at least 6 characters')
          .required('*Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          }

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId)
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id)
                } else {
                  localStorage.removeItem('rememberMe')
                }
                props.history.push('/')
              } else {
                setFormErrorMessage('Check out your Account or Password again.')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again.')
              setTimeout(() => {
                setFormErrorMessage('')
              }, 3000)
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

            <div className='title'>Sign In</div>
            <p className='subTitle'>If you do not have an account,<br/> registering for an account is free and simple.</p>
            <Form style={{ minWidth: '290px' }} {...formItemLayout} onSubmit={handleSubmit}>

              <Form.Item required>
                <Input
                  id='email'
                  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='　Email'
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

              <Form.Item required>
                <Input
                  id='password'
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='　Password'
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

              {formErrorMessage && (
                <label className='error'>{formErrorMessage}</label>
              )}

              <Form.Item>              
                <Checkbox id='rememberMe' onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                {/*
                <a className='login-form-forgot' href='/reset_user' style={{ float: 'right' }}>
                  forgot password
                  </a>
                */}
                <div>
                  <Button className='grayButton' htmlType='submit' disabled={isSubmitting} onSubmit={handleSubmit}>
                    SIGNIN
                </Button>
                </div>
                Or <a href='/register'>Register now</a>
              </Form.Item>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export default withRouter(LoginPage)


