/**
* Fetch, update and create Calendars data from database using API.
* Send data of specific id to edit page.
* Handle delete method
* React and JSX
* @version React 16.5.2
* @author [Masudul Hasan Shawon](masudul@atilimited.ne* 
*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import CreateCalendar from './CreateCalendar';
// import EditCalendar from './EditCalendar';
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

import { calendarActions } from '../../../../_actions/calendar.action';
import { userActions } from "src/_actions";

import ShowMoreText from 'react-show-more-text';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import CreateCalendar from "./calendar.settings.create";
import EditCalendar from "./calendar.settings.edit";
import {  Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CalendarsList = props => {
  const calendars = useSelector(state => state.calendars);
  const calendar = useSelector(state => state.calendars.calendar);
  const addOrUpdateStatus = useSelector(state => state.calendars.addOrUpdateStatus);
  // const deleteStatus = useSelector(state => state.calendars.deleteStatus);
  const dispatch = useDispatch();
  const [currentCalendar, setCurrentCalendar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);
  // const deleting = useSelector(state => state.calendars.deleting);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect((calendar) => {
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
    dispatch(calendarActions.getAll());
    $('#myTable').DataTable();
   }
    
}, [calendar]);

function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages);
}

  function handleDeleteCalendar(id) {
    const deleteStatus = dispatch(calendarActions.delete(id));
    if(deleteStatus.type === "SYSTEMS_DELETE_SUCCESS"){
      toast.success("✓ Calendar has been deleted successfully!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  // const refreshList = () => {
  //   dispatch(calendarActions.getAll());
  // };

  const setActiveCalendar = (calendar, index) => {
    setCurrentCalendar(calendar);
    setCurrentIndex(index);
  };

  const deleteCalendar = (id) => {

    confirmAlert({
      title: 'Delete This Calendar!',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: ' Yes, Delete it!',
          onClick: () => {
           handleDeleteCalendar(id)
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
          <h4 className="breadcrumb-title">Calendars</h4>
          <ul className="db-breadcrumb-list">
            <li><Link to="/admin-index"><i className="fa fa-home" />Home</Link></li>
            <li>Calendars</li>
          </ul>
        </div>
        <CCard>                 
          <CCardHeader className="bg-info">
            All Calendars List

            <CButton
            className="btn btn-sm btn-success"
            style={{float:"right", border:'.001em solid #22963c'}}
            data-toggle="modal"
            data-target="#createCalendars"
            >
              <i style={{fontSize: '5px!important'}} className="fa fa-plus"></i><span> Add</span>
            </CButton>
            
          </CCardHeader>
          {
            calendars.items ?
            <CCardBody>    
              <table id="myTable" className="table table-striped table-bordered dataTable dtr-inline table-hover">
                  <thead>
                    <tr>
                      <th>SI</th>
                      <th>Title</th>
                      <th>Calendar</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th style={{width:"11%"}}>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      calendars.items &&
                      calendars.items.map((calendar, index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{calendar.title}</td>
                         <td style={{width:'10px!important'}}>
                            <Document
                              file={calendar.calendar_file}
                              onLoadSuccess={onDocumentLoadSuccess}
                            >
                              <Page pageNumber={pageNumber} />
                            </Document>
                            <p>Page {pageNumber} of {numPages}</p>

                         </td>
                          <td>{calendar.priority}</td>
                          <td><span className={calendar.active_status == 1 ? 'badge badge-success badge-pill' : 'badge badge-danger badge-pill'}>{calendar.active_status == 1? 'active' : 'inactive'}</span></td>             
                          <td>
                            <button 
                              className='btn btn-info btn-xs'
                              onClick={() => setActiveCalendar(calendar, calendar.id)}
                              data-toggle="modal" data-target="#editModal"
                              >
                              <i class="fa fa-pencil-square-o"></i>
                            </button>
                            <button 
                                className='btn btn-danger btn-xs ml-1'
                                onClick={() => deleteCalendar(calendar.id)}
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
                      <th>Title</th>
                      <th>Calendar</th>
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
          <CreateCalendar/>
          {currentCalendar ? (
            <EditCalendar
            id = {currentCalendar.id}
            title             = {currentCalendar.title}
            active_status     = {true}
            priority          = {currentCalendar.priority}
          />
        ) : 
        (
          <div></div>
        )}
       
    </div>

  );
};

export default CalendarsList;
