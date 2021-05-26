import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

function LeftMenu() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default LeftMenu