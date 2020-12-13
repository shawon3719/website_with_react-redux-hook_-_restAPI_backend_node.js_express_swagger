import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { employeeActions, employeeCategoryActions } from 'src/_actions';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CInputCheckbox,
  CTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import ReactQuill from 'react-quill';
import toolbarOptions  from "src/reusable/toolbarOptions"

function CreateEmployee() {
    const user = useSelector(state => state.authentication.user);
    const initialEmployeeState = {
      employee_id       : '',
      full_name         : '',
      father_name       : '',
      mother_name       : '',
      designation       : '',
      nid               : '',
      gender            : '',
      date_of_birth     : '',
      phone             : '',
      email             : '',
      present_address   : '',
      permanent_address : '',
      joining_date      : '',
      employee_category : '',
      active_status     : true,
      priority          : '',
      created_by        : user.firstName+' '+user.lastName
    };
    const [employee, setEmployee] = useState(initialEmployeeState);
    const employeeCategories = useSelector(state => state.employeeCategories);
    const [submitted, setSubmitted] = useState(false);
    const [state, setinitialState] = useState(false);
    const submitting = useSelector(state => state.employees.loading);
    const [employeeImage, setEmployeeImage] = useState('');
    const [imgData, setImgData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(employeeCategoryActions.getAll());
      setEmployee(initialEmployeeState);
      setSubmitted(false);
    }, [state]);


    function resetForm(e) {
      e.preventDefault();
      setEmployee(initialEmployeeState);
      setEmployeeImage(false);
      setImgData(null);
      $('#createForm input[type=file]').val('')
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setEmployee(employee => ({ ...employee, [name]: value }));
    }

    function handleCheckChange(e) {
        const { name, checked } = e.target;
      setEmployee(employee => ({ ...employee, [name]: checked }));
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
    };

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        setinitialState(true);
        if (employee.full_name && employee.employee_id) {
            dispatch(employeeActions.create(employee, employeeImage));   
            $('#createEmployees').modal('toggle');
            $('.modal-backdrop').remove(); 
        }
    }

    return (

      <div className="modal fade" id="createEmployees" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title" id="createEmployees">Create New Employee</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CForm id="createForm" onSubmit={handleSubmit}>
                  <CFormGroup row>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="employee_id">Employee ID <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm"className={'form-control' + (submitted && !employee.employee_id ? ' is-invalid' : '')} value={employee.employee_id} id="employee_id" name='employee_id' onChange={handleChange} placeholder="Enter Employee's ID." />
                          {submitted && !employee.employee_id &&
                                <div className="invalid-feedback">Employee ID is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="full_name">Full-Name <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm" className={'form-control' + (submitted && !employee.full_name ? ' is-invalid' : '')} value={employee.full_name} id="full_name" name='full_name' onChange={handleChange} placeholder="Enter Employee's Full-Name." />
                          {submitted && !employee.full_name &&
                                <div className="invalid-feedback">Employee's Full-Name is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="father_name">Father's Name <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm" className={'form-control' + (submitted && !employee.father_name ? ' is-invalid' : '')} value={employee.father_name} id="father_name" name='father_name' onChange={handleChange} placeholder="Enter Father's Name." />
                          {submitted && !employee.father_name &&
                                <div className="invalid-feedback">Father's Name is required</div>
                            }
                      </CFormGroup>
                    </CCol><CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="mother_name">Mother's Name <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm" className={'form-control' + (submitted && !employee.mother_name ? ' is-invalid' : '')} value={employee.mother_name} id="mother_name" name='mother_name' onChange={handleChange} placeholder="Enter Mother's Name." />
                          {submitted && !employee.mother_name &&
                                <div className="invalid-feedback">Mother's is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="designation">Designation <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm" className={'form-control' + (submitted && !employee.designation ? ' is-invalid' : '')} value={employee.designation} id="designation" name='designation' onChange={handleChange} placeholder="Enter Employee's Designation." />
                          {submitted && !employee.designation &&
                                <div className="invalid-feedback">Employee Designation is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="profile_photo">Employee Photo</CLabel>
                          <CInput custom size="sm" type="file" name="profile_photo"  onChange={handleImageChange} id="profile_photo" className={'form-control' + (submitted && !employeeImage ? ' is-invalid' : '')}  />
                          {submitted && !employeeImage &&
                                <div className="invalid-feedback">Employee Profile Photo is required</div>
                            }
                      </CFormGroup>
                      <div className="previewEmployeePhoto">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="nid">NID <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm" className={'form-control' + (submitted && !employee.nid ? ' is-invalid' : '')} value={employee.nid} id="nid" name='nid' onChange={handleChange} placeholder="Enter Employee's NID No." />
                          {submitted && !employee.nid &&
                                <div className="invalid-feedback">NID is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup>
                          <CLabel htmlFor="gender">Gender <span className="requiredText">*</span></CLabel>
                          <CSelect custom size="sm" className={'form-control' + (submitted && !employee.gender ? ' is-invalid' : '')} value={employee.gender} id="gender" name='gender' onChange={handleChange} placeholder="Enter Employee's Gender.">
                            <option value="">Please select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                          </CSelect>
                          {submitted && !employee.gender &&
                                      <div className="invalid-feedback">Gender is required</div>
                          }
                      </CFormGroup>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup>
                          <CLabel htmlFor="date_of_birth">Date of Birth <span className="requiredText">*</span></CLabel>
                          <CInput type="date" custom size="sm" className={'form-control' + (submitted && !employee.date_of_birth ? ' is-invalid' : '')} value={employee.date_of_birth} id="date_of_birth" name='date_of_birth' onChange={handleChange} placeholder="Enter Employee's Date of Birth." />
                          {submitted && !employee.date_of_birth &&
                                <div className="invalid-feedback">DOB is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="email">Email <span className="requiredText">*</span></CLabel>
                          <CInput custom size="sm" className={'form-control' + (submitted && !employee.email ? ' is-invalid' : '')} value={employee.email} id="email" name='email' onChange={handleChange} placeholder="Enter Employee's Email." />
                          {submitted && !employee.email &&
                                <div className="invalid-feedback">Email is required</div>
                            }
                          </CFormGroup>
                    </CCol>
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel htmlFor="phone">Mobile No. <span className="requiredText">*</span></CLabel>
                            <CInput custom size="sm" type="number" value={employee.phone} name='phone'  onChange={handleChange} id="phone" placeholder="Enter employee's mobile no."  className={'form-control' + (submitted && !employee.phone ? ' is-invalid' : '')} />
                            {submitted && !employee.phone &&
                                <div className="invalid-feedback">Employee mobile no. is required</div>
                            }
                        </CFormGroup>
                    </CCol>
                    <CCol md="6">
                    <CFormGroup>
                        <CLabel htmlFor="present_address">Present Address <span className="requiredText">*</span></CLabel>
                        <CTextarea rows="2" custom size="sm" value={employee.present_address} name='present_address'  onChange={handleChange} id="present_address" placeholder="Enter employee's present address"  className={'form-control' + (submitted && !employee.present_address ? ' is-invalid' : '')} />
                        {submitted && !employee.present_address &&
                            <div className="invalid-feedback">Employee Present Address is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                    <CCol md="6">
                    <CFormGroup>
                        <CLabel htmlFor="permanent_address">Permanent Address <span className="requiredText">*</span></CLabel>
                        <CTextarea rows="2" custom size="sm" value={employee.permanent_address} name='permanent_address'  onChange={handleChange} id="permanent_address" placeholder="Enter employee's permanent address"  className={'form-control' + (submitted && !employee.permanent_address ? ' is-invalid' : '')} />
                        {submitted && !employee.permanent_address &&
                            <div className="invalid-feedback">Employee Permanent Address is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup>
                          <CLabel htmlFor="employee_category">Employee Category <span className="requiredText">*</span></CLabel>
                          <CSelect custom size="sm" className={'form-control' + (submitted && !employee.employee_category ? ' is-invalid' : '')} value={employee.employee_category} id="employee_category" name='employee_category' onChange={handleChange} placeholder="Enter Employee's Category.">
                            <option value="">Please select</option>
                            {
                      employeeCategories.items &&
                      employeeCategories.items.map((employeeCategory, index) => (
                        employeeCategory.active_status == 1?
                            <option value={employeeCategory.id}>{employeeCategory.category_name}</option>
                            : ''
                      ))}
                          </CSelect>
                          {submitted && !employee.employee_category &&
                                      <div className="invalid-feedback">Employee Category is required</div>
                          }
                      </CFormGroup>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup>
                          <CLabel htmlFor="joining_date">Joining Date <span className="requiredText">*</span></CLabel>
                          <CInput type="date" custom size="sm" className={'form-control' + (submitted && !employee.joining_date ? ' is-invalid' : '')} value={employee.joining_date} id="joining_date" name='joining_date' onChange={handleChange} placeholder="Enter Employee's Joining Date." />
                          {submitted && !employee.joining_date &&
                                <div className="invalid-feedback">Joining date is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput custom size="sm" type="number" value={employee.priority} name='priority' onChange={handleChange} id="priority" placeholder="Enter employee's priority"  className={'form-control' + (submitted && !employee.priority ? ' is-invalid' : '')} />
                        </CFormGroup>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                            <CInputCheckbox
                                id="activeStatus"
                                name="active_status"
                                checked={employee.active_status}
                                onChange={handleCheckChange}
                                custom
                            />
                            <CLabel variant="custom-checkbox" htmlFor="activeStatus">
                            Active
                            </CLabel>
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

export default CreateEmployee ;
