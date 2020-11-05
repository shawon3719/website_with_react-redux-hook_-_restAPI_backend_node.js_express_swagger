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
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function TheHeaderDropdown() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
  //  alert(user.firstName);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(userActions.getAll());
    // }, []);

// class TheHeaderDropdown extends React.Component {
//   constructor() {
//       super()
//       this.state = {
//           profile_image: '',
//           name: '',
//       }
//   }
//   componentDidMount() {
//     let user = JSON.parse(localStorage.getItem('user'))
//    this.setState({
//      profile_image  : user.profile,
//      name           : user.firstName+' '+user.lastName
//    })
//   }
//   render () {
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
            src={user.profile}
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
          <strong>{user.firstName+' '+user.lastName}</strong>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
        <Link to="/admin">
          <CIcon name="cil-lock-locked" className="mfe-2" /> 
          Sign Out
          </Link>
        </CDropdownItem>
        
      </CDropdownMenu>
    </CDropdown>
  )
}
return(
  <TheHeaderDropdownVar/>
);
}
// }
export default TheHeaderDropdown
