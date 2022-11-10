import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';


function BreadCrumbs() {
  return (
    <div>
    <Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
    </div>

  )
}

export default BreadCrumbs

// https://getbootstrap.com/docs/5.0/components/breadcrumb/