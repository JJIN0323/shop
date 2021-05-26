import React from 'react'
import LeftMenu from './Sections/LeftMenu'
import RightMenu from './Sections/RightMenu'
import { useDisclosure } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import logo from './logo.png'
import './Sections/Navbar.css'

function NavBar() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <nav className='header'>
      <div className='logo'>
        <a href='/'><img src={logo} alt='logo' /></a>
      </div>
      <div className='menu'>
        <div className='menuLeft'>
          <LeftMenu />
        </div>
        <div className='menuRight'>
          <RightMenu />
        </div>
        <IconButton aria-label="Search database" icon={<HamburgerIcon />} ref={btnRef} onClick={onOpen} className='mobileMenu' />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <RightMenu />
          </DrawerHeader>

          <DrawerBody>
            CATEGORY-
          </DrawerBody>

        </DrawerContent>
      </Drawer>
      </div>
    </nav>
  )
}

export default NavBar