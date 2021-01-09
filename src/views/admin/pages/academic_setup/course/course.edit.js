
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
import EmployeeCategoryDataService from "../../../../../_services/combined.service";
import { employeeCategoryActions } from "src/_actions";

const EditEmployeeCategory = props => {
  const user = useSelector(state => state.authentication.user);
  const initialEmployeeCategoryState = {
    id                : props,
    category_name     : '',
    active_status     : '',
    priority          : '',
    updated_by        : user.firstName+' '+user.lastName
  };
  const [currentEmployeeCategory, setCurrentEmployeeCategory] = useState(initialEmployeeCategoryState);
  const [employeeCategoryImage, setEmployeeCategoryImage] = useState("");
  const [imgData, setImgData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getEmployeeCategoryByID(props.id)
  }, [props.id]);

  const getEmployeeCategoryByID = id => {
    EmployeeCategoryDataService.getEmployeeCategory(id)
      .then(response => {
        setCurrentEmployeeCategory(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });  
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setCurrentEmployeeCategory({ ...currentEmployeeCategory, [name]: value, updated_by  : user.firstName+' '+user.lastName });
  };

  function handleEditCheckChange(e){
    const { checked } = e.target;
    setCurrentEmployeeCategory(currentEmployeeCategory => ({ ...currentEmployeeCategory, active_status: checked, updated_by  : user.firstName+' '+user.lastName }));
  }

  const updateEmployeeCategory = () => {
    setSubmitted(true);
    if (currentEmployeeCategory.category_name && currentEmployeeCategory.priority) {
        dispatch(employeeCategoryActions.update(currentEmployeeCategory));
        $('#editModal').modal('toggle');
        $('.modal-backdrop').remove();   
    }
  };
  return (
    <div>
      {currentEmployeeCategory ? (
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title" id="editModal">Update This EmployeeCategory</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CForm >
                <CFormGroup row>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="category_name">Category Name <span className="requiredText">*</span></CLabel>
                          <CInput type="text" className={'form-control' + (submitted && !currentEmployeeCategory.category_name ? ' is-invalid' : '')} value={currentEmployeeCategory.category_name} id="category_name" name='category_name' onChange={handleChange} placeholder="Enter Employee Category's Name." />
                          {submitted && !currentEmployeeCategory.category_name &&
                                <div className="invalid-feedback">Employee Category Name is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={currentEmployeeCategory.priority} name='priority' onChange={handleChange} id="priority" placeholder="Enter priority"  className={'form-control' + (submitted && !currentEmployeeCategory.priority ? ' is-invalid' : '')} />
                        </CFormGroup>
                    </CCol>
                    {/* <CCol md="3">
                        <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                            <CInputCheckbox
                                id="activeStatus"
                                name="active_status"
                                checked={currentEmployeeCategory.active_status}
                                onChange={handleEditCheckChange}
                                custom
                            />
                            <CLabel variant="custom-checkbox" htmlFor="activeStatus">
                            Active
                            </CLabel>
                        </CFormGroup>
                    </CCol> */}
                    <CCol md="3">
                      <CFormGroup row>
                        <CCol style={{ color: currentEmployeeCategory.active_status == 1? 'green': 'red'}} tag="label" sm="12" className="col-form-label">
                          {currentEmployeeCategory.active_status == 1? " Active" : " Inactive"}
                        </CCol>
                        <CCol sm="12">
                          <CSwitch
                            className="mr-1"
                            color = {currentEmployeeCategory.active_status == 1? "success" : "danger"}
                            checked = {currentEmployeeCategory.active_status == 1? true : false}
                            onChange={handleEditCheckChange}
                            shape="pill"
                            variant="outline"
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <div style={{textAlign: 'center'}}>
                    <CButton onClick={updateEmployeeCategory} size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
                    {" "}
                    <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                  </div>
                  </CForm>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal"><i className="fa fa-times"></i> Close</button>
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

export default EditEmployeeCategory;