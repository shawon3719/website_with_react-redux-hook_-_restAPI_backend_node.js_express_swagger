/**
* Fetch, update and create EmployeeCategorys data from database using API.
* Send data of specific id to edit page.
* Handle delete method
* React and JSX
* @version React 16.5.2
* @author [Masudul Hasan Shawon](masudul@atilimited.ne* 
*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import CreateEmployeeCategory from './CreateEmployeeCategory';
// import EditEmployeeCategory from './EditEmployeeCategory';
import $, { isEmptyObject } from 'jquery'
// Scripts
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
} from '@coreui/react'

import { useDispatch, useSelector } from 'react-redux';
import { employeeCategoryActions, userActions } from "src/_actions";

import ShowMoreText from 'react-show-more-text';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import CreateEmployeeCategory from "./program.create";
import EditEmployeeCategory from "./program.edit";


const EmployeeCategorysList = props => {
  const employeeCategories = useSelector(state => state.employeeCategories);
  const employeeCategory = useSelector(state => state.employeeCategories.employeeCategory);
  const addOrUpdateStatus = useSelector(state => state.employeeCategories.addOrUpdateStatus);
  // const deleteStatus = useSelector(state => state.employeeCategories.deleteStatus);
  const dispatch = useDispatch();
  const [currentEmployeeCategory, setCurrentEmployeeCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);
  // const deleting = useSelector(state => state.employeeCategories.deleting);

  useEffect((employeeCategory) => {
   if(isLoggedIn != true){
     dispatch(userActions.logout());
     window.location.href = "/#/admin"
   }else{
    if(addOrUpdateStatus){
      toast.success("✓ "+addOrUpdateStatus+"!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    dispatch(employeeCategoryActions.getAll());
    $('#myTable').DataTable();
   }
    
}, [employeeCategory]);

  function handleDeleteEmployeeCategory(id) {
    const deleteStatus = dispatch(employeeCategoryActions.delete(id));
    if(deleteStatus.type === "EMPLOYEE_CATEGORYS_DELETE_SUCCESS"){
      toast.success("✓ Employee Category has been deleted successfully!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  const setActiveEmployeeCategory = (employeeCategory, index) => {
    setCurrentEmployeeCategory(employeeCategory);
    setCurrentIndex(index);
  };

  const deleteEmployeeCategory = (id) => {

    confirmAlert({
      title: 'Delete This EmployeeCategory!',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: ' Yes, Delete it!',
          onClick: () => {
           handleDeleteEmployeeCategory(id)
          }
        },
        {
          label: 'Cancel'
        }
      ]
    });
  };

  return (
    <div>
        <ToastContainer />
        <div className="db-breadcrumb">
          <h4 className="breadcrumb-title">EmployeeCategorys</h4>
          <ul className="db-breadcrumb-list">
            <li><Link to="/admin-index"><i className="fa fa-home" />Home</Link></li>
            <li>EmployeeCategorys</li>
          </ul>
        </div>
        <CCard>                 
          <CCardHeader className="bg-info">
            All Employee Categorys List
            <CButton
            className="btn btn-sm btn-success"
            style={{float:"right", border:'.001em solid #22963c'}}
            data-toggle="modal"
            data-target="#createEmployeeCategories"
            >
              <i style={{fontSize: '5px!important'}} className="fa fa-plus"></i><span> Add</span>
            </CButton>
          </CCardHeader>
          {
            employeeCategories.items ?
            <CCardBody>    
              <table id="myTable" className="table table-striped table-bordered dataTable dtr-inline table-hover">
                  <thead>
                    <tr>
                      <th>SI</th>
                      <th>Category Name</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th style={{width:"11%"}}>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      employeeCategories.items &&
                      employeeCategories.items.map((employeeCategory, index) => (
                        <tr  key={employeeCategory.id} >
                          <td >{index+1}</td>
                          <td>{employeeCategory.category_name}</td>
                          <td>{employeeCategory.priority}</td>
                                        <td><span className={employeeCategory.active_status == 1 ? 'badge badge-success badge-pill' : 'badge badge-danger badge-pill'}>{employeeCategory.active_status == 1? 'active' : 'inactive'}</span></td>
                                        
                          <td>
                            <button 
                              className='btn btn-info btn-xs'
                              onClick={() => setActiveEmployeeCategory(employeeCategory, employeeCategory.id)}
                              data-toggle="modal" data-target="#editModal"
                              >
                              <i className="fa fa-pencil-square-o"></i>
                            </button>
                            <button 
                                className='btn btn-danger btn-xs ml-1'
                                onClick={() => deleteEmployeeCategory(employeeCategory.id)}
                                >
                                {/* {deleting && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
                                <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                  <tfoot>
                    <tr>
                    <th>SI</th>
                      <th>Category Name</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th style={{width:"11%"}}>Action</th>
                    </tr>
                  </tfoot>
                </table>
              
            </CCardBody>   
            :
            <div className="text-center" style={{textAlign: "center", marginTop: "98px", height: "500px"}} >
              <span className="spinner-border spinner-border-lg"></span>
            </div>
          }
          </CCard>
          <CreateEmployeeCategory/>
          {currentEmployeeCategory ? (
            <EditEmployeeCategory
            id                = {currentEmployeeCategory.id}
            category_name     = {currentEmployeeCategory.category_name}
            active_status     = {currentEmployeeCategory.active_status}
            priority          = {currentEmployeeCategory.priority}
          />
        ) : 
        (
          <div></div>
        )}
       
    </div>

  );
};

export default EmployeeCategorysList;
