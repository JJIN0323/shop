import React, { useState, useLayoutEffect } from 'react'
import LeftMenu from './Sections/LeftMenu'
import RightMenu from './Sections/RightMenu'
import { Drawer, Button } from 'antd'
import { BiMenu } from 'react-icons/bi'
import logo from './logo.png'

function NavBar() {
  
const [visible, setVisible] = useState(false)

const showDrawer = () => {
    setVisible(true)
}

const onClose = () => {
    setVisible(false)
}

const [scrolled, setScrolled] = useState(false)

  useLayoutEffect(() => {

    const handleScroll = (event) => {
      setScrolled(window.scrollY > 0)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
        window.removeEventListener('scroll', handleScroll)
    }

  }, [])

return (
    <nav className={ scrolled ? 'header scroll' : 'header'}>
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
          <BiMenu />
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