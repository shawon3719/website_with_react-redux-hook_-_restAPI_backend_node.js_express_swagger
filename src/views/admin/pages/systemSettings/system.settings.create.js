import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { systemActions } from '../../../../_actions/system.action';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CInputCheckbox,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {apiUrl} from '../../../../reusable/apiHost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authHeader } from '../../../../_helpers';
import $ from 'jquery';
import ReactQuill from 'react-quill';
import toolbarOptions  from "src/reusable/toolbarOptions"

function CreateSystem() {
    const user = useSelector(state => state.authentication.user);
    const initialSystemState = {
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
    const [system, setSystem] = useState(initialSystemState);
    const [active_status, setActive] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [state, setinitialState] = useState(false);
    const submitting = useSelector(state => state.systems.loading);
    const [systemImage, setSystemImage] = useState(null);
    const [imgData, setImgData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
      setSubmitted(false);
    }, [state]);


    function resetForm(e) {
      e.preventDefault();
      setSystem(initialSystemState);
      setSystemImage(false);
      setImgData(null);
      $('#createForm input[type=file]').val('')
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setSystem(system => ({ ...system, [name]: value }));
    }

    function handleCheckChange(e) {
        const { name, checked } = e.target;
      setSystem(system => ({ ...system, [name]: checked }));
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
    };

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        setinitialState(true);
        if (system.title && system.system_url) {
            dispatch(systemActions.create(system, systemImage));   
            $('#createSystems').modal('toggle');
            $('.modal-backdrop').remove(); 
        }
    }

    return (

      <div className="modal fade" id="createSystems" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title" id="createSystems">Create New System</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CForm id="createForm" onSubmit={handleSubmit}>
                  <CFormGroup row>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="systemName">System Name <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !system.systemName ? ' is-invalid' : '')} value={system.systemName} id="systemName" name='systemName' onChange={handleChange} placeholder="Enter System's Name." />
                          {submitted && !system.systemName &&
                                <div className="invalid-feedback">System Name is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="title">Title <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !system.title ? ' is-invalid' : '')} value={system.title} id="title" name='title' onChange={handleChange} placeholder="Enter System's Title." />
                          {submitted && !system.title &&
                                <div className="invalid-feedback">Title is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="description">email <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !system.email ? ' is-invalid' : '')} value={system.email} id="email" name='email' onChange={handleChange} placeholder="Enter System's Email." />
                          {submitted && !system.description &&
                                <div className="invalid-feedback">Description is required</div>
                            }
                          </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="system_logo">System Logo</CLabel>
                          <CInput type="file" name="system_logo"  onChange={handleImageChange} id="systemLogo"  />
                          {/* {submitted && !system.image &&
                                <div className="invalid-feedback">System image is required</div>
                            } */}
                      </CFormGroup>
                      <div className="previewSystemLogo">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel htmlFor="phone_no">Phone Number <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={system.phone_no} name='phone_no'  onChange={handleChange} id="phone_no" placeholder="Enter system's phone no."  className={'form-control' + (submitted && !system.phone_no ? ' is-invalid' : '')} />
                            {submitted && !system.phone_no &&
                                <div className="invalid-feedback">System phone no. is required</div>
                            }
                        </CFormGroup>
                    </CCol>
                    <CCol md="6">
                    <CFormGroup>
                        <CLabel htmlFor="mobile">Mobile <span className="requiredText">*</span></CLabel>
                        <CInput type="number" value={system.mobile} name='mobile'  onChange={handleChange} id="mobile" placeholder="Enter system's mobile"  className={'form-control' + (submitted && !system.mobile ? ' is-invalid' : '')} />
                        {submitted && !system.mobile &&
                            <div className="invalid-feedback">System mobile is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                    <CCol md="6">
                    <CFormGroup>
                        <CLabel htmlFor="system_url">System URL <span className="requiredText">*</span></CLabel>
                        <CInput type="text" value={system.system_url} name='system_url'  onChange={handleChange} id="system_url" placeholder="Enter system's url"  className={'form-control' + (submitted && !system.system_url ? ' is-invalid' : '')} />
                        {submitted && !system.system_url &&
                            <div className="invalid-feedback">System url is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={system.priority} name='priority' onChange={handleChange} id="priority" placeholder="Enter system's priority"  className={'form-control' + (submitted && !system.priority ? ' is-invalid' : '')} />
                        </CFormGroup>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                            <CInputCheckbox
                                id="activeStatus"
                                name="active_status"
                                checked={system.active_status}
                                onChange={handleCheckChange}
                                custom
                            />
                            <CLabel variant="custom-checkbox" htmlFor="activeStatus">
                            Active
                            </CLabel>
                        </CFormGroup>
                    </CCol>
                    <CCol md="12">
                    <CFormGroup>
                        <CLabel htmlFor="address">Address <span className="requiredText">*</span></CLabel>
                        <CInput type="text" value={system.address} name='address'  onChange={handleChange} id="address" placeholder="Enter system's address"  className={'form-control' + (submitted && !system.address ? ' is-invalid' : '')} />
                        {submitted && !system.address &&
                            <div className="invalid-feedback">System address is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <div style={{textAlign: 'center'}}>
                    <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" />
                    {submitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Submit
                    </CButton>
                    {" "}
                    <CButton type="reset" onClick={resetForm} size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                  </div>
                </CForm>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default CreateSystem ;
