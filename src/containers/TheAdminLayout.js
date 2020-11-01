import React from 'react'
import {
  TheAdminContent,
  TheAdminSidebar,
  TheAdminFooter,
  TheAdminHeader
} from './adminIndex'
const TheAdminLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <TheAdminSidebar/>
      <div className="c-wrapper">
        <TheAdminHeader/>
        <div className="c-body">
          <TheAdminContent/>
        </div>
        <TheAdminFooter/>
      </div>
    </div>
  )
}

export default TheAdminLayout
