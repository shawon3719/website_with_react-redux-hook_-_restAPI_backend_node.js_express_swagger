
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CInputCheckbox,
  CSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import SystemDataService from "../../../../_services/combined.service";
import { systemActions } from '../../../../_actions/system.action';

const EditSystem = props => {
  const user = useSelector(state => state.authentication.user);
  const getSystemByID = useSelector(state => state.systems.currentSystem)
  const initialSystemState = {
    id: props,
    systemName        : '',
    title             : '',
    email             : '',
    system_url        : '',
    phone_no          : '',
    mobile            : '',
    address           : '',
    active_status     : true,
    priority          : '',
    created_by        : user.firstName+' '+user.lastName
  };
  const [currentSystem, setCurrentSystem] = useState(initialSystemState);
  const [systemImage, setSystemImage] = useState("");
  const [imgData, setImgData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getSystem(props.id)
    }, [props.id]);
    
    const getSystem = id => {
      SystemDataService.getSystem(id)
        .then(response => {
          setCurrentSystem(response.data.data);
        })
        .catch(e => {
          console.log(e);
    });  
  };
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentSystem({ ...currentSystem, [name]: value, updated_by  : user.firstName+' '+user.lastName });
  };

  function handleEditCheckChange(e){
    const { checked } = e.target;
    setCurrentSystem(currentSystem => ({ ...currentSystem, active_status: checked, updated_by  : user.firstName+' '+user.lastName }));
  }

  const handleImageChange = e => {
    if (e.target.files[0]) {
        setSystemImage(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
    }
    setCurrentSystem({ ...currentSystem, updated_by  : user.firstName+' '+user.lastName });
  };

  const updateSystem = () => {
    setSubmitted(true);
    if (currentSystem.title && currentSystem.systemName) {
        dispatch(systemActions.update(currentSystem, systemImage));
        $('#editModal').modal('toggle');
        $('.modal-backdrop').remove();   
    }
  };
  return (
    <div>
      {currentSystem ? (
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title" id="editModal">Update This System</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CForm >
                <CFormGroup row>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="systemName">System Name <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !currentSystem.systemName ? ' is-invalid' : '')} value={currentSystem.systemName} name='systemName' onChange={handleInputChange} placeholder="Enter System's Name." />
                          {submitted && !currentSystem.systemName &&
                                <div className="invalid-feedback">System Name is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="title">Title <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !currentSystem.title ? ' is-invalid' : '')} value={currentSystem.title} name='title' onChange={handleInputChange} placeholder="Enter System's Title." />
                          {submitted && !currentSystem.title &&
                                <div className="invalid-feedback">Title is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="description">email <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !currentSystem.email ? ' is-invalid' : '')} value={currentSystem.email}  name='email' onChange={handleInputChange} placeholder="Enter System's Email." />
                          {submitted && !currentSystem.email &&
                                <div className="invalid-feedback">Description is required</div>
                            }
                          </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="system_logo">System Logo</CLabel>
                          <CInput type="file" name="system_logo"  onChange={handleImageChange}   />
                          {/* {submitted && !system.image &&
                                <div className="invalid-feedback">System logo is required</div>
                            } */}
                      </CFormGroup>
                      <div className="previewSystemLogo">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel htmlFor="phone_no">Phone Number <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={currentSystem.phone_no} name='phone_no'  onChange={handleInputChange}  placeholder="Enter system's phone no."  className={'form-control' + (submitted && !currentSystem.phone_no ? ' is-invalid' : '')} />
                            {submitted && !currentSystem.phone_no &&
                                <div className="invalid-feedback">System phone no. is required</div>
                            }
                        </CFormGroup>
                    </CCol>
                    <CCol md="6">
                    <CFormGroup>
                        <CLabel htmlFor="mobile">Mobile <span className="requiredText">*</span></CLabel>
                        <CInput type="number" value={currentSystem.mobile} name='mobile'  onChange={handleInputChange} placeholder="Enter system's mobile"  className={'form-control' + (submitted && !currentSystem.mobile ? ' is-invalid' : '')} />
                        {submitted && !currentSystem.mobile &&
                            <div className="invalid-feedback">System mobile is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                    <CCol md="6">
                    <CFormGroup>
                        <CLabel htmlFor="system_url">System URL <span className="requiredText">*</span></CLabel>
                        <CInput type="text" value={currentSystem.system_url} name='system_url'  onChange={handleInputChange}  placeholder="Enter system's url"  className={'form-control' + (submitted && !currentSystem.system_url ? ' is-invalid' : '')} />
                        {submitted && !currentSystem.system_url &&
                            <div className="invalid-feedback">System url is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={currentSystem.priority} name='priority' onChange={handleInputChange}  placeholder="Enter system's priority"  className={'form-control' + (submitted && !currentSystem.priority ? ' is-invalid' : '')} />
                        </CFormGroup>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup row>
                        <CCol style={{ color: currentSystem.active_status == 1? 'green': 'red'}} tag="label" sm="12" className="col-form-label">
                          {currentSystem.active_status == 1? " Active" : " Inactive"}
                        </CCol>
                        <CCol sm="12">
                          <CSwitch
                            className="mr-1"
                            color = {currentSystem.active_status == 1? "success" : "danger"}
                            checked = {currentSystem.active_status == 1? true : false}
                            onChange={handleEditCheckChange}
                            shape="pill"
                            variant="outline"
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                    <CCol md="12">
                    <CFormGroup>
                        <CLabel htmlFor="address">Address <span className="requiredText">*</span></CLabel>
                        <CInput type="text" value={currentSystem.address} name='address'  onChange={handleInputChange} placeholder="Enter system's address"  className={'form-control' + (submitted && !currentSystem.address ? ' is-invalid' : '')} />
                        {submitted && !currentSystem.address &&
                            <div className="invalid-feedback">System address is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <div style={{textAlign: 'center'}}>
                    <CButton onClick={updateSystem} size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
                    {" "}
                    <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                  </div>
                  </CForm>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        </div>
      ) : 
      (
        <div>
          <br />
          {
            setCurrentSystem(getSystemByID)}
        </div>
      )}
    </div>
  );
};

export default EditSystem;