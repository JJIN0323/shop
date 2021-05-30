import React, { useState } from 'react'
import LeftMenu from './Sections/LeftMenu'
import RightMenu from './Sections/RightMenu'
import { Drawer, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import logo from './logo.png'
import './Sections/Navbar.css'

function NavBar() {

  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  } 

  return (
    <nav className='header'>
      <div className='logo'>
        <a href='/'><img src={logo} alt='logo' /></a>
      </div>
      <div className='menu'>
        <div className='menuLeft'>
          <LeftMenu mode='horizontal' />
        </div>
        <div className='menuRight'>
          <RightMenu mode='horizontal' />
        </div>
        <Button
          className='mobileMenu'
          type='primary'
          onClick={showDrawer}
        >
          <MenuOutlined />
        </Button>
        <Drawer
          title=''
          placement='right'
          className='menu_drawer'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode='inline' />
          <RightMenu mode='inline' />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar