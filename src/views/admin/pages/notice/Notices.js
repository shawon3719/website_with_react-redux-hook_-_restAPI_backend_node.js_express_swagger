/**
* Fetch, update and create Notices data from database using API.
* Send data of specific id to edit page.
* Handle delete method
* React and JSX
* @version React 16.5.2
* @author [Masudul Hasan Shawon](masudul@atilimited.ne* 
*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateNotice from './CreateNotice';
import EditNotice from './EditNotice';
import $ from 'jquery'
// Scripts
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
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

import { noticeActions } from '../../../../_actions/notice.action';
import { userActions } from "src/_actions";

import ShowMoreText from 'react-show-more-text';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { customUrl } from  "src/reusable/apiHost";


const NoticesList = props => {
  const notices = useSelector(state => state.notices);
  const notice = useSelector(state => state.notices.notice);
  const addOrUpdateStatus = useSelector(state => state.notices.addOrUpdateStatus);
  const deleteStatus = useSelector(state => state.notices.deleteStatus);
  const dispatch = useDispatch();
  const [currentNotice, setCurrentNotice] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);
  const deleting = useSelector(state => state.notices.deleting);

  useEffect((notice) => {
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
    dispatch(noticeActions.getAll());
    $('#myTable').DataTable();
   }
    
}, [notice]);

  function handleDeleteNotice(id) {
    const deleteStatus = dispatch(noticeActions.delete(id));
    if(deleteStatus.type === "NOTICES_DELETE_SUCCESS"){
      toast.success("✓ Notice has been deleted successfully!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  const setActiveNotice = (notice, index) => {
    setCurrentNotice(notice);
    setCurrentIndex(index);
  };

  const deleteNotice = (id) => {

    confirmAlert({
      title: 'Delete This Notice!',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: ' Yes, Delete it!',
          onClick: () => {
           handleDeleteNotice(id)
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
          <h4 className="breadcrumb-title">Notices</h4>
          <ul className="db-breadcrumb-list">
            <li><Link to="/admin-index"><i className="fa fa-home" />Home</Link></li>
            <li>Notices</li>
          </ul>
        </div>
        <CCard>                 
          <CCardHeader className="bg-info">
            All Notices List
            <CButton
            className="btn btn-sm btn-success"
            style={{float:"right", border:'.001em solid #22963c'}}
            data-toggle="modal"
            data-target="#createNotices"
            >
              <i style={{fontSize: '5px!important'}} className="fa fa-plus"></i><span> Add</span>
            </CButton>
          </CCardHeader>
          {
            notices.items ?
            <CCardBody>    
              <table id="myTable" className="table table-striped table-bordered dataTable dtr-inline table-hover">
                  <thead>
                    <tr>
                      <th>SI</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th style={{width:"11%"}}>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      notices.items &&
                      notices.items.map((notice, index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{notice.title}</td>
                          <td>
                            <ShowMoreText
                              lines={2}
                              more='Read more'
                              less='Show less'
                              anchorClass=''
                              expanded={false} 
                            >
                              <ReactQuill value={notice.description} theme="bubble" readOnly />
                            </ShowMoreText> 
                          </td>
                          <td><img src={notice.image} width="100"/></td>
                          <td><span className={notice.active_status == 1 ? 'badge badge-success badge-pill' : 'badge badge-danger badge-pill'}>{notice.active_status == 1? 'active' : 'inactive'}</span></td>
                          <td>{notice.priority}</td>
                          <td>
                            <button 
                              className='btn btn-info btn-xs'
                              onClick={() => setActiveNotice(notice, notice.id)}
                              data-toggle="modal" data-target="#editModal"
                              >
                              <i class="fa fa-pencil-square-o"></i>
                            </button>
                            <button 
                                className='btn btn-danger btn-xs ml-1'
                                onClick={() => deleteNotice(notice.id)}
                                >
                                {deleting && <span className="spinner-border spinner-border-sm mr-1"></span>}
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
                      <th>Title</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Action</th>
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
        <CreateNotice/>
        {currentNotice ? (
          <EditNotice
            id = {currentNotice.id}
            title = {currentNotice.title}
            image = {currentNotice.image}
            description = {currentNotice.description}
            created_by = {currentNotice.created_by}
            priority = {currentNotice.priority}
            active_status = {currentNotice.active_status == 1? true : false}
          />
        ) : 
        (
          <div></div>
        )}
    </div>

  );
};

export default NoticesList;
