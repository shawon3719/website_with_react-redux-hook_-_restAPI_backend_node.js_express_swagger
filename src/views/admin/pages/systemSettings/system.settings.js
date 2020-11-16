/**
* Fetch, update and create Systems data from database using API.
* Send data of specific id to edit page.
* Handle delete method
* React and JSX
* @version React 16.5.2
* @author [Masudul Hasan Shawon](masudul@atilimited.ne* 
*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import CreateSystem from './CreateSystem';
// import EditSystem from './EditSystem';
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

import { systemActions } from '../../../../_actions/system.action';
import { userActions } from "src/_actions";

import ShowMoreText from 'react-show-more-text';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import CreateSystem from "./system.settings.create";


const SystemsList = props => {
  const systems = useSelector(state => state.systems);
  const system = useSelector(state => state.systems.system);
  const addOrUpdateStatus = useSelector(state => state.systems.addOrUpdateStatus);
  // const deleteStatus = useSelector(state => state.systems.deleteStatus);
  const dispatch = useDispatch();
  const [currentSystem, setCurrentSystem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);
  // const deleting = useSelector(state => state.systems.deleting);

  useEffect((system) => {
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
    dispatch(systemActions.getAll());
    $('#myTable').DataTable();
   }
    
}, [system]);

  function handleDeleteSystem(id) {
    const deleteStatus = dispatch(systemActions.delete(id));
    if(deleteStatus.type === "SYSTEMS_DELETE_SUCCESS"){
      toast.success("✓ System has been deleted successfully!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  // const refreshList = () => {
  //   dispatch(systemActions.getAll());
  // };

  const setActiveSystem = (system, index) => {
    setCurrentSystem(system);
    setCurrentIndex(index);
  };

  const deleteSystem = (id) => {

    confirmAlert({
      title: 'Delete This System!',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: ' Yes, Delete it!',
          onClick: () => {
           handleDeleteSystem(id)
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
          <h4 className="breadcrumb-title">Systems</h4>
          <ul className="db-breadcrumb-list">
            <li><Link to="/admin-index"><i className="fa fa-home" />Home</Link></li>
            <li>Systems</li>
          </ul>
        </div>
        <CCard>                 
          <CCardHeader className="bg-info">
            All Systems List

            <CButton
            className="btn btn-sm btn-success"
            style={{float:"right", border:'.001em solid #22963c'}}
            data-toggle="modal"
            data-target="#createSystems"
            >
              <i style={{fontSize: '5px!important'}} className="fa fa-plus"></i><span> Add</span>
            </CButton>
            
          </CCardHeader>
          {
            systems.items ?
            <CCardBody>    
              <table id="myTable" className="table table-striped table-bordered dataTable dtr-inline table-hover">
                  <thead>
                    <tr>
                      <th>SI</th>
                      <th>Sys. Name</th>
                      <th>Sys. Title</th>
                      <th>Sys. URL</th>
                      <th>Contacts</th>
                      <th>Sys. Logo</th>
                      <th>Address</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th style={{width:"11%"}}>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      systems.items &&
                      systems.items.map((system, index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{system.systemName}</td>
                          <td>{system.title}</td>
                          <td>{system.system_url}</td>
                          <td>{'Email: '+system.email+', Phone: '+system.phone_no+', Mobile: '+system.mobile}</td>
                          <td><img src={system.system_logo} width="100"/></td>
                          <td>{system.address}</td>
                          <td>{system.priority}</td>
                                        <td><span className={system.active_status == 1 ? 'badge badge-success badge-pill' : 'badge badge-danger badge-pill'}>{system.active_status == 1? 'active' : 'inactive'}</span></td>
                                        
                          <td>
                            <button 
                              className='btn btn-info btn-xs'
                              onClick={() => setActiveSystem(system, system.id)}
                              data-toggle="modal" data-target="#editModal"
                              >
                              <i class="fa fa-pencil-square-o"></i>
                            </button>
                            <button 
                                className='btn btn-danger btn-xs ml-1'
                                onClick={() => deleteSystem(system.id)}
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
                      <th>Sys. Name</th>
                      <th>Sys. Title</th>
                      <th>Sys. URL</th>
                      <th>Contacts</th>
                      <th>Sys. Logo</th>
                      <th>Address</th>
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
          <CreateSystem/>
       
    </div>

  );
};

export default SystemsList;
