import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../../adminRoutes'

import { TheHeaderDropdown }  from '../index'


class TheHeader extends React.Component {
  constructor() {
      super()
      this.state = {
          email: ''
      }
  }
  // componentDidMount() {
  //  alert("hello")
  // }
  

  render () {
      const TheHeaderVar = () => {
        const dispatch = useDispatch()
        const sidebarShow = useSelector(state => state.sidebarShow)

        const toggleSidebar = () => {
          const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
          dispatch({type: 'set', sidebarShow: val})
        }

        const toggleSidebarMobile = () => {
          const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
          dispatch({type: 'set', sidebarShow: val})
        }
        return (
          <CHeader withSubheader>
            <CToggler
              inHeader
              className="ml-md-3 d-lg-none"
              onClick={toggleSidebarMobile}
            />
            <CToggler
              inHeader
              className="ml-3 d-md-down-none"
              onClick={toggleSidebar}
            />
            <CHeaderBrand className="mx-auto d-lg-none" to="/">
              <CIcon name="logo" height="48" alt="Logo"/>
            </CHeaderBrand>

            <CHeaderNav className="d-md-down-none mr-auto">
              <CHeaderNavItem className="px-3" >
                <CHeaderNavLink to="/admin-index">Dashboard</CHeaderNavLink>
              </CHeaderNavItem>
              <CHeaderNavItem  className="px-3">
                <CHeaderNavLink to="/users">Users</CHeaderNavLink>
              </CHeaderNavItem>
              <CHeaderNavItem className="px-3">
                <CHeaderNavLink>Settings</CHeaderNavLink>
              </CHeaderNavItem>
            </CHeaderNav>

            <CHeaderNav className="px-3">
              <TheHeaderDropdown/>
            </CHeaderNav>
            </CHeader>
        )
      }
      return(
        <TheHeaderVar/>
      );
    }
}
export default TheHeader
