/**
* Fetch, update and create Calendars data from database using API.
* Send data of specific id to edit page.
* Handle delete method
* React and JSX
* @version React 16.5.2
* @author [Masudul Hasan Shawon](masudul@atilimited.ne* 
*/

import React, { useState, useRef, useEffect } from "react";
import throttle from 'lodash/throttle';
import { Link } from "react-router-dom";
// import CreateCalendar from './CreateCalendar';
// import EditCalendar from './EditCalendar';
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

import { calendarActions } from '../../../../_actions/calendar.action';
import { userActions } from "src/_actions";
import {customUrl} from "src/reusable/apiHost"
import ShowMoreText from 'react-show-more-text';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import CreateCalendar from "./calendar.settings.create";
import EditCalendar from "./calendar.settings.edit";
import {  Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CalendarsList = (props, data, onDocumentLoadSuccess) => {
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
  const [prevBtnDisbaled, setPrevBtnStatus] = useState(false);
  const [nextBtnDisbaled, setNextBtnStatus] = useState(false);

  const [initialWidth, setInitialWidth] = useState(null);
const pdfWrapper = useRef(null);

const setPdfSize = () => {
  if (pdfWrapper && pdfWrapper.current) {
    setInitialWidth(pdfWrapper.current.getBoundingClientRect().width);
  }
};

  useEffect((calendar) => {
    $('#myTable').DataTable();
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
    //Responsive PDF
  window.addEventListener('resize', throttle(setPdfSize, 100));
  setPdfSize();
  return () => {
    window.removeEventListener('resize', throttle(setPdfSize, 100));
  };
    
   }
    
}, [calendar]);

function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages);
}

function handlePrevPage(){
  if(pageNumber >= 2){
    setPageNumber(pageNumber - 1 )
    setPrevBtnStatus(false)
    setNextBtnStatus(false)
  }else{
    setPrevBtnStatus(true)
  }
}

function handleNextPage(){
  if(pageNumber <= numPages-1){
    setPageNumber(pageNumber + 1 )
    setNextBtnStatus(false)
    setPrevBtnStatus(false)
  }else{
    setNextBtnStatus(true)
  }
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
            {
              isEmptyObject(calendars.items) ?
              <CButton
              className="btn btn-sm btn-success"
              style={{float:"right", border:'.001em solid #22963c'}}
              data-toggle="modal"
              data-target="#createCalendars"
              >
                <i style={{fontSize: '5px!important'}} className="fa fa-plus"></i><span> Add</span>
              </CButton>
            :
            ''
          }
            
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
                            <div id="row" style={{height: 'auto', display: 'flex', marginBottom:"2%"}} >
                              <div id="placeholderWrapper" style={{ height: 'auto' }} />
                              <div id="pdfWrapper" style={{ width: '22vw' }} ref={pdfWrapper}>
                                  <Document
                                    file={customUrl+calendar.calendar_file}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    noData="No Calendar Found!"
                                    loading={<span className="spinner-border spinner-border-lg mr-1"></span>}
                                  >
                                    <Page pageNumber={pageNumber} loading={<span className="spinner-border spinner-border-lg mr-1"></span>} width={initialWidth} />
                                    <div className="row" width={initialWidth}>
                                      <div className="col-md-6 col-lg-6 col-sm-6 text-right">
                                        <p style={{ fontSize:"12px"}}>Page {pageNumber} of {numPages}</p>
                                      </div>
                                      <div className="col-md-6 col-lg-6 col-sm-6 text-left">
                                        <CButton className="btn-sm btn-warning mr-2" disabled={prevBtnDisbaled} onClick={handlePrevPage}><i className="fa fa-arrow-left"></i></CButton>
                                        <CButton className="btn-sm btn-warning" disabled={nextBtnDisbaled} onClick={handleNextPage}><i className="fa fa-arrow-right"></i></CButton>
                                      </div>
                                    </div>
                                  </Document>
                                </div>
                            </div>
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
            title = {currentCalendar.title}
            priority = {currentCalendar.priority}
            active_status = {currentCalendar.active_status == 1? true : false}
          />
        ) : 
        (
          <div></div>
        )}
       
    </div>

  );
};

export default CalendarsList;
