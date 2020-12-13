import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CTextarea,
  CSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import EmployeeDataService from "../../../../../_services/combined.service";
import { employeeActions, employeeCategoryActions } from "src/_actions";

const EditEmployee = props => {
  const user = useSelector(state => state.authentication.user);
  const initialEmployeeState = {
    id                : props,
    full_name         : '',
    father_name       : '',
    mother_name       : '',
    designation       : '',
    profile_photo     : '',
    nid               : '',
    gender            : '',
    date_of_birth     : '',
    phone             : '',
    email             : '',
    present_address   : '',
    permanent_address : '',
    joining_date      : '',
    employee_category : '',
    active_status     : '',
    priority          : '',
    updated_by        : user.firstName+' '+user.lastName
  };
  const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);
  const employeeCategories = useSelector(state => state.employeeCategories);
  const [employeeImage, setEmployeeImage] = useState("");
  const [imgData, setImgData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(employeeCategoryActions.getAll());
    getEmployee(props.id);
    }, [props.id]);
    
    const getEmployee = id => {
      EmployeeDataService.getEmployee(id)
        .then(response => {
            setCurrentEmployee(response.data.data);
        })
        .catch(e => {
          console.log(e);
        });  
    };
  const handleChange = event => {
    const { name, value } = event.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value, updated_by  : user.firstName+' '+user.lastName });
  };

  function handleEditCheckChange(e) {
    const { name, checked } = e.target;
    setCurrentEmployee(currentEmployee => ({ ...currentEmployee, active_status: checked, updated_by  : user.firstName+' '+user.lastName }));
  }
  

  const handleImageChange = e => {
    if (e.target.files[0]) {
        setEmployeeImage(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
    }
    setCurrentEmployee({ ...currentEmployee, updated_by  : user.firstName+' '+user.lastName });
  };

  const updateEmployee = () => {
    setSubmitted(true);
    if (currentEmployee.full_name && currentEmployee.employee_id) {
        dispatch(employeeActions.update(currentEmployee, employeeImage));
        $('#editModal').modal('toggle');
        $('.modal-backdrop').remove();   
    }
  };
  return (
    <div>
      {currentEmployee ? (
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title" id="editModal">Update This Employee</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CForm >
                <CFormGroup row>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="employee_id">Employee ID <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm"className={'form-control' + (submitted && !currentEmployee.employee_id ? ' is-invalid' : '')} value={currentEmployee.employee_id} id="employee_id" name='employee_id' onChange={handleChange} placeholder="Enter Employee's ID." />
                          {submitted && !currentEmployee.employee_id &&
                                <div className="invalid-feedback">Employee ID is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="full_name">Full-Name <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm" className={'form-control' + (submitted && !currentEmployee.full_name ? ' is-invalid' : '')} value={currentEmployee.full_name} id="full_name" name='full_name' onChange={handleChange} placeholder="Enter Employee's Full-Name." />
                          {submitted && !currentEmployee.full_name &&
                                <div className="invalid-feedback">Employee's Full-Name is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="father_name">Father's Name <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm" className={'form-control' + (submitted && !currentEmployee.father_name ? ' is-invalid' : '')} value={currentEmployee.father_name} id="father_name" name='father_name' onChange={handleChange} placeholder="Enter Father's Name." />
                          {submitted && !currentEmployee.father_name &&
                                <div className="invalid-feedback">Father's Name is required</div>
                            }
                      </CFormGroup>
                    </CCol><CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="mother_name">Mother's Name <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm" className={'form-control' + (submitted && !currentEmployee.mother_name ? ' is-invalid' : '')} value={currentEmployee.mother_name} id="mother_name" name='mother_name' onChange={handleChange} placeholder="Enter Mother's Name." />
                          {submitted && !currentEmployee.mother_name &&
                                <div className="invalid-feedback">Mother's is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="designation">Designation <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm" className={'form-control' + (submitted && !currentEmployee.designation ? ' is-invalid' : '')} value={currentEmployee.designation} id="designation" name='designation' onChange={handleChange} placeholder="Enter Employee's Designation." />
                          {submitted && !currentEmployee.designation &&
                                <div className="invalid-feedback">Employee Designation is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="profile_photo">Employee Photo</CLabel>
                          <CInput custom size="sm" type="file" name="profile_photo"  onChange={handleImageChange} id="profile_photo"  />
                          {/* {submitted && !employeeImage &&
                                <div className="invalid-feedback">Employee Profile Photo is required</div>
                            } */}
                      </CFormGroup>
                      <div className="previewEmployeePhoto">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="nid">NID <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm" className={'form-control' + (submitted && !currentEmployee.nid ? ' is-invalid' : '')} value={currentEmployee.nid} id="nid" name='nid' onChange={handleChange} placeholder="Enter Employee's NID No." />
                          {submitted && !currentEmployee.nid &&
                                <div className="invalid-feedback">NID is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup>
                          <CLabel htmlFor="gender">Gender <span className="requiredText">*</span></CLabel>
                          <CSelect custom size="sm" className={'form-control' + (submitted && !currentEmployee.gender ? ' is-invalid' : '')} value={currentEmployee.gender} id="gender" name='gender' onChange={handleChange} placeholder="Enter Employee's Gender.">
                            <option value="">Please select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                          </CSelect>
                          {submitted && !currentEmployee.gender &&
                                      <div className="invalid-feedback">Gender is required</div>
                          }
                      </CFormGroup>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup>
                          <CLabel htmlFor="date_of_birth">Date of Birth <span className="requiredText">*</span></CLabel>
                          <CInput type="date" custom size="sm" className={'form-control' + (submitted && !currentEmployee.date_of_birth ? ' is-invalid' : '')} value={currentEmployee.date_of_birth} id="date_of_birth" name='date_of_birth' onChange={handleChange} placeholder="Enter Employee's Date of Birth." />
                          {submitted && !currentEmployee.date_of_birth &&
                                <div className="invalid-feedback">DOB is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="email">Email <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm" className={'form-control' + (submitted && !currentEmployee.email ? ' is-invalid' : '')} value={currentEmployee.email} id="email" name='email' onChange={handleChange} placeholder="Enter Employee's Email." />
                          {submitted && !currentEmployee.email &&
                                <div className="invalid-feedback">Email is required</div>
                            }
                          </CFormGroup>
                    </CCol>
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel htmlFor="phone">Mobile No. <span className="requiredText">*</span></CLabel>
                            <CInput custom size="sm" type="number" value={currentEmployee.phone} name='phone'  onChange={handleChange} id="phone" placeholder="Enter employee's mobile no."  className={'form-control' + (submitted && !currentEmployee.phone ? ' is-invalid' : '')} />
                            {submitted && !currentEmployee.phone &&
                                <div className="invalid-feedback">Employee mobile no. is required</div>
                            }
                        </CFormGroup>
                    </CCol>
                    <CCol md="6">
                    <CFormGroup>
                        <CLabel htmlFor="present_address">Present Address <span className="requiredText">*</span></CLabel>
                        <CTextarea rows="2" custom size="sm" value={currentEmployee.present_address} name='present_address'  onChange={handleChange} id="present_address" placeholder="Enter employee's present address"  className={'form-control' + (submitted && !currentEmployee.present_address ? ' is-invalid' : '')} />
                        {submitted && !currentEmployee.present_address &&
                            <div className="invalid-feedback">Employee Present Address is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                    <CCol md="6">
                    <CFormGroup>
                        <CLabel htmlFor="permanent_address">Permanent Address <span className="requiredText">*</span></CLabel>
                        <CTextarea rows="2" custom size="sm" value={currentEmployee.permanent_address} name='permanent_address'  onChange={handleChange} id="permanent_address" placeholder="Enter employee's permanent address"  className={'form-control' + (submitted && !currentEmployee.permanent_address ? ' is-invalid' : '')} />
                        {submitted && !currentEmployee.permanent_address &&
                            <div className="invalid-feedback">Employee Permanent Address is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup>
                          <CLabel htmlFor="employee_category">Employee Category <span className="requiredText">*</span></CLabel>
                          <CSelect custom size="sm" className={'form-control' + (submitted && !currentEmployee.employee_category ? ' is-invalid' : '')} value={currentEmployee.employee_category} id="employee_category" name='employee_category' onChange={handleChange} placeholder="Enter Employee's Category.">
                            <option value="">Please select</option>
                            {
                                employeeCategories.items &&
                                employeeCategories.items.map((employeeCategory, index) => (
                                    employeeCategory.active_status == 1?
                                    <option value={employeeCategory.id} selected={employeeCategory.id == currentEmployee.employee_category ? true : false}>{employeeCategory.category_name}</option>
                                    : ''
                            ))}
                          </CSelect>
                          {submitted && !currentEmployee.employee_category &&
                                      <div className="invalid-feedback">Employee Category is required</div>
                          }
                      </CFormGroup>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup>
                          <CLabel htmlFor="joining_date">Joining Date <span className="requiredText">*</span></CLabel>
                          <CInput type="date" custom size="sm" className={'form-control' + (submitted && !currentEmployee.joining_date ? ' is-invalid' : '')} value={currentEmployee.joining_date} id="joining_date" name='joining_date' onChange={handleChange} placeholder="Enter Employee's Joining Date." />
                          {submitted && !currentEmployee.joining_date &&
                                <div className="invalid-feedback">Joining date is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput custom size="sm" type="number" value={currentEmployee.priority} name='priority' onChange={handleChange} id="priority" placeholder="Enter employee's priority"  className={'form-control' + (submitted && !currentEmployee.priority ? ' is-invalid' : '')} />
                        </CFormGroup>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup row>
                        <CCol style={{ color: currentEmployee.active_status == 1? 'green': 'red'}} tag="label" sm="12" className="col-form-label">
                          {currentEmployee.active_status == 1? " Active" : " Inactive"}
                        </CCol>
                        <CCol sm="12">
                          <CSwitch
                            className="mr-1"
                            color = {currentEmployee.active_status == 1? "success" : "danger"}
                            checked = {currentEmployee.active_status == 1? true : false}
                            onChange={handleEditCheckChange}
                            shape="pill"
                            variant="outline"
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <div style={{textAlign: 'center'}}>
                    <CButton onClick={updateEmployee} size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
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
        </div>
      )}
    </div>
  );
};

export default EditEmployee;