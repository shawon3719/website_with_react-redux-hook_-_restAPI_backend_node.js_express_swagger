/**
* Fetch, update and create Sliders data from database using API.
* Send data of specific id to edit page.
* Handle delete method
* React and JSX
* @version React 16.5.2
* @author [Masudul Hasan Shawon](masudul@atilimited.ne* 
*/

import React, { useState, useEffect } from "react";
// import SliderDataService from "../../../../_services/combined.service";
import { Link } from "react-router-dom";
import CreateSlider from './CreateSlider';
import EditSlider from './EditSlider';
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

import { sliderActions } from '../../../../_actions/slider.action';
import { userActions } from "src/_actions";

import ShowMoreText from 'react-show-more-text';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";


const SlidersList = props => {
  const sliders = useSelector(state => state.sliders);
  const slider = useSelector(state => state.sliders.slider);
  const addOrUpdateStatus = useSelector(state => state.sliders.addOrUpdateStatus);
  const deleteStatus = useSelector(state => state.sliders.deleteStatus);
  const dispatch = useDispatch();
  const [currentSlider, setCurrentSlider] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);
  const deleting = useSelector(state => state.sliders.deleting);

  useEffect((slider) => {
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
    dispatch(sliderActions.getAll());
    $('#myTable').DataTable();
   }
    
}, [slider]);

  function handleDeleteSlider(id) {
    const deleteStatus = dispatch(sliderActions.delete(id));
    if(deleteStatus.type === "SLIDERS_DELETE_SUCCESS"){
      toast.success("✓ Slider has been deleted successfully!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  const setActiveSlider = (slider, index) => {
    setCurrentSlider(slider);
    setCurrentIndex(index);
  };

  const deleteSlider = (id) => {

    confirmAlert({
      title: 'Delete This Slider!',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: ' Yes, Delete it!',
          onClick: () => {
           handleDeleteSlider(id)
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
          <h4 className="breadcrumb-title">Sliders</h4>
          <ul className="db-breadcrumb-list">
            <li><Link to="/admin-index"><i className="fa fa-home" />Home</Link></li>
            <li>Sliders</li>
          </ul>
        </div>
        <CCard>                 
          <CCardHeader className="bg-info">
            All Sliders List
            <CButton
            className="btn btn-sm btn-success"
            style={{float:"right", border:'.001em solid #22963c'}}
            data-toggle="modal"
            data-target="#createSliders"
            >
              <i style={{fontSize: '5px!important'}} className="fa fa-plus"></i><span> Add</span>
            </CButton>
          </CCardHeader>
          {
            sliders.items ?
            <CCardBody>    
              <table id="myTable" className="table table-striped table-bordered dataTable dtr-inline table-hover">
                  <thead>
                    <tr>
                      <th>SI</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th style={{width:"11%"}}>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      sliders.items &&
                      sliders.items.map((slider, index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{slider.title}</td>
                          <td>
                            <ShowMoreText
                              lines={2}
                              more='Read more'
                              less='Show less'
                              anchorClass=''
                              expanded={false} 
                            >
                              <ReactQuill value={slider.description} theme="bubble" readOnly />
                            </ShowMoreText> 
                          </td>
                          <td><img src={slider.image} width="100"/></td>
                          <td>{slider.priority}</td>
                          <td><span className={slider.active_status == 1 ? 'badge badge-success badge-pill' : 'badge badge-danger badge-pill'}>{slider.active_status == 1? 'active' : 'inactive'}</span></td>
                          <td>
                            <button 
                              className='btn btn-info btn-xs'
                              onClick={() => setActiveSlider(slider, slider.id)}
                              data-toggle="modal" data-target="#editModal"
                              >
                              <i class="fa fa-pencil-square-o"></i>
                            </button>
                            <button 
                                className='btn btn-danger btn-xs ml-1'
                                onClick={() => deleteSlider(slider.id)}
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
                      <th>Priority</th>
                      <th>Status</th>
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
        <CreateSlider/>
        {currentSlider ? (
          <EditSlider
            id = {currentSlider.id}
            title = {currentSlider.title}
            description = {currentSlider.description}
            created_by = {currentSlider.created_by}
            priority = {currentSlider.priority}
          />
        ) : 
        (
          <div></div>
        )}
    </div>

  );
};

export default SlidersList;
