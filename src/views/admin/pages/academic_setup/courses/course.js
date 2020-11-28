/**
* Fetch, update and create Employees data from database using API.
* Send data of specific id to edit page.
* Handle delete method
* React and JSX
* @version React 16.5.2
* @author [Masudul Hasan Shawon](masudul@atilimited.ne* 
*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import CreateEmployee from './CreateEmployee';
// import EditEmployee from './EditEmployee';
import $ from 'jquery'
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
import { employeeActions, userActions } from "src/_actions";

import ShowMoreText from 'react-show-more-text';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import CreateEmployee from "./course.create";
import EditEmployee from "./course.edit";


const EmployeesList = props => {
  const employees = useSelector(state => state.employees);
  const employee = useSelector(state => state.employees.employee);
  const addOrUpdateStatus = useSelector(state => state.employees.addOrUpdateStatus);
  // const deleteStatus = useSelector(state => state.employees.deleteStatus);
  const dispatch = useDispatch();
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);
  // const deleting = useSelector(state => state.employees.deleting);

  useEffect((employee) => {
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
    dispatch(employeeActions.getAll());
    $('#myTable').DataTable();
   }
    
}, [employee]);

  function handleDeleteEmployee(id) {
    const deleteStatus = dispatch(employeeActions.delete(id));
    if(deleteStatus.type === "EMPLOYEES_DELETE_SUCCESS"){
      toast.success("✓ Employee has been deleted successfully!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  // const refreshList = () => {
  //   dispatch(employeeActions.getAll());
  // };

  const setActiveEmployee = (employee, index) => {
    setCurrentEmployee(employee);
    setCurrentIndex(index);
  };

  const deleteEmployee = (id) => {

    confirmAlert({
      title: 'Delete This Employee!',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: ' Yes, Delete it!',
          onClick: () => {
           handleDeleteEmployee(id)
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
          <h4 className="breadcrumb-title">Employees</h4>
          <ul className="db-breadcrumb-list">
            <li><Link to="/admin-index"><i className="fa fa-home" />Home</Link></li>
            <li>Employees</li>
          </ul>
        </div>
        <CCard>                 
          <CCardHeader className="bg-info">
            All Employees List
            <CButton
            className="btn btn-sm btn-success"
            style={{float:"right", border:'.001em solid #22963c'}}
            data-toggle="modal"
            data-target="#createEmployees"
            >
              <i style={{fontSize: '5px!important'}} className="fa fa-plus"></i><span> Add</span>
            </CButton>
          </CCardHeader>
          {
            employees.items ?
            <CCardBody>    
              <table id="myTable" className="table table-striped table-bordered dataTable dtr-inline table-hover">
                  <thead>
                    <tr>
                      <th>SI</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Contacts</th>
                      <th>Photo</th>
                      <th style={{width:"20%"}}>Info</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th style={{width:"11%"}}>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      employees.items &&
                      employees.items.map((employee, index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{employee.employee_id}</td>
                          <td><p style={{fontSize:"15px", fontWeight:"bold", color:"darkgreen"}}>{employee.full_name}</p><br/><i>{employee.designation}</i></td>
                          <td>{employee.employee_category}</td>
                          <td><b>Email: </b>{employee.email} <b>Phone: </b>{employee.phone}</td>
                          <td><img src={employee.profile_photo} width="100"/></td>
                          <td><b>DOB: </b>{employee.date_of_birth} <br/><b>Joining Date: </b>{employee.joining_date}<br/><b>Present Address: </b>{employee.present_address}<br/><b>Permanent Address: </b>{employee.permanent_address}</td>
                          <td>{employee.priority}</td>
                                        <td><span className={employee.active_status == 1 ? 'badge badge-success badge-pill' : 'badge badge-danger badge-pill'}>{employee.active_status == 1? 'active' : 'inactive'}</span></td>
                                        
                          <td>
                            <button 
                              className='btn btn-info btn-xs'
                              onClick={() => setActiveEmployee(employee, employee.id)}
                              data-toggle="modal" data-target="#editModal"
                              >
                              <i class="fa fa-pencil-square-o"></i>
                            </button>
                            <button 
                                className='btn btn-danger btn-xs ml-1'
                                onClick={() => deleteEmployee(employee.id)}
                                >
                                {/* {deleting && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
                                <i class="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>SI</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Contacts</th>
                      <th>Photo</th>
                      <th>Info</th>
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
          <CreateEmployee/>
          {currentEmployee ? (
            <EditEmployee
            id = {currentEmployee.id}
          />
        ) : 
        (
          <div></div>
        )}
       
    </div>

  );
};

export default EmployeesList;
