import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class TheHeaderDropdown extends React.Component {
  constructor() {
      super()
      this.state = {
          profile_image: '',
          name: '',
      }
  }
  componentDidMount() {
   this.setState({
     profile_image  : localStorage.getItem('profile_image'),
     name           : localStorage.getItem('profile_name'),
   })
  }
  render () {
const TheHeaderDropdownVar = () => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={this.state.profile_image}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>{this.state.name}</strong>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" /> 
          Sign-out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}
return(
  <TheHeaderDropdownVar/>
);
}
}
export default TheHeaderDropdown
