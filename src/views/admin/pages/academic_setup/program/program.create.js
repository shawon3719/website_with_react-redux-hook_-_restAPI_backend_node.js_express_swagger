import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import { employeeCategoryActions } from 'src/_actions';

function CreateEmployeeCategory() {
    const user = useSelector(state => state.authentication.user);
    const initialEmployeeCategoryState = {
      category_name        : '',
      active_status     : true,
      priority          : '',
      created_by        : user.firstName+' '+user.lastName
    };
    const [employeeCategory, setEmployeeCategory] = useState(initialEmployeeCategoryState);
    const [active_status, setActive] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [state, setinitialState] = useState(false);
    const submitting = useSelector(state => state.employeeCategories.loading);
    const dispatch = useDispatch();

    useEffect(() => {
      setSubmitted(false);
    }, [state]);


    function resetForm(e) {
      e.preventDefault();
      setEmployeeCategory(initialEmployeeCategoryState);
      $('#createForm input[type=file]').val('')
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setEmployeeCategory(employeeCategory => ({ ...employeeCategory, [name]: value }));
    }

    function handleCheckChange(e) {
        const { name, checked } = e.target;
      setEmployeeCategory(employeeCategory => ({ ...employeeCategory, [name]: checked }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        setinitialState(true);
        if (employeeCategory.category_name && employeeCategory.priority) {
            dispatch(employeeCategoryActions.create(employeeCategory));   
            $('#createEmployeeCategories').modal('toggle');
            $('.modal-backdrop').remove(); 
            setEmployeeCategory(initialEmployeeCategoryState)
        }else{
          alert("Fillout all details")
        }
    }

    return (

      <div className="modal fade" id="createEmployeeCategories" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title" id="createEmployeeCategories">Create New Employee Category</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CForm id="createForm" onSubmit={handleSubmit}>
                  <CFormGroup row>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="category_name">Category Name <span className="requiredText">*</span></CLabel>
                          <CInput type="text" className={'form-control' + (submitted && !employeeCategory.category_name ? ' is-invalid' : '')} value={employeeCategory.category_name} id="category_name" name='category_name' onChange={handleChange} placeholder="Enter Employee Category's Name." />
                          {submitted && !employeeCategory.category_name &&
                                <div className="invalid-feedback">Employee Category Name is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={employeeCategory.priority} name='priority' onChange={handleChange} id="priority" placeholder="Enter priority"  className={'form-control' + (submitted && !employeeCategory.priority ? ' is-invalid' : '')} />
                        </CFormGroup>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                            <CInputCheckbox
                                id="activeStatus"
                                name="active_status"
                                checked={employeeCategory.active_status}
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
                <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal"><i className="fa fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default CreateEmployeeCategory ;
