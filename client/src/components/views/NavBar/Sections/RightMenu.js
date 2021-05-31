/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Menu } from 'antd'
import axios from 'axios'
import { USER_SERVER } from '../../../Config'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push('/login')
      } else {
        alert('Log Out Failed')
      }
    })
  }

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        {/* Authentication을 거치지 않고 볼 수 있는 메뉴 */}
        <Menu.Item key='login'>
          <a href='/login'>Sign In</a>
        </Menu.Item>
        <Menu.Item key='register'>
          <a href='/register'>Sign Up</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        {/* Authentication을 거쳐 로그인 한 유저만 볼 수 있는 메뉴 */}
        <Menu.Item key='upload'>
          <a href='/product/upload'>Upload</a>
        </Menu.Item>
        <Menu.Item key='logout'>
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu)
