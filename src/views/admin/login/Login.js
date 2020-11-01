import React from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl } from '../../../reusable/apiHost'
class SignIn extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            auth_token: '',
            errors: '',
            error_body: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        sessionStorage.clear();
        localStorage.clear();
        this.setState({ auth_token: '' })
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({"email":this.state.email,"password":this.state.password});
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        fetch(apiUrl+"users/login", requestOptions)
          .then(response => response.text())
          .then((response) => {
                var obj = JSON.parse(response);
                window.localStorage.setItem('x-auth-token', obj.token);
                var token = obj.token;
                console.log(token)
                if(token){
                toast.success("✓ "+obj.message+"!",{
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true
                });
                this.props.history.push('/admin-index');
                }else{
                  toast.error(obj.message,{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                  });
                } 
            })
            .catch(error => {
              this.setState({
                      errors: 'true',
                      error_body: error.message
              });
              toast.error(""+error+"",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
              });
        });
    }
    render () {
        return(
           
          <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
      <ToastContainer />
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm noValidate onSubmit={this.onSubmit}>
                    <h1>KYANC Admin</h1>
                    <p className="text-muted">Sign In to get acess.</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput 
                      type="text" 
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onChange}
                      autoComplete="email" 
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                      autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>KYANC</h2>
                    <p>Khwaja Yunus Ali Nursing College is recognized by Bangladesh Nursing Council. KYAMCH Nursing College represents the nurses who care for patients at the Hospital.</p>
                    <Link to="/">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Visit Main Site!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
          
          );
    }
}

export default SignIn;