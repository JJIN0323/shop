import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
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
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href='/login'>Sign In</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='/register'>Sign Up</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )
  } else {
    return (
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={logoutHandler}>Logout</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )
  }
}

export default withRouter(RightMenu)

