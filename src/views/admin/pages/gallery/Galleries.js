/**
* Fetch, update and create Galleries data from database using API.
* Send data of specific id to edit page.
* Handle delete method
* React and JSX
* @version React 16.5.2
* @author [Masudul Hasan Shawon](masudul@atilimited.ne* 
*/

import React, { useState, useEffect } from "react";
// import GalleryDataService from "../../../../_services/GalleryService";
import { Link } from "react-router-dom";
import CreateGallery from './CreateGallery';
import EditGallery from './EditGallery';
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

import { galleryActions } from '../../../../_actions/gallery.action';
import { userActions } from "src/_actions";
import { customUrl } from "src/reusable/apiHost";

const GalleriesList = props => {
  const galleries = useSelector(state => state.galleries);
  const gallery = useSelector(state => state.galleries.gallery);
  const addOrUpdateStatus = useSelector(state => state.galleries.addOrUpdateStatus);
  const deleteStatus = useSelector(state => state.galleries.deleteStatus);
  const dispatch = useDispatch();
  const [currentGallery, setCurrentGallery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);
  const deleting = useSelector(state => state.galleries.deleting);

  useEffect((gallery) => {
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
    dispatch(galleryActions.getAll());
    $('#myTable').DataTable();
   }
    
}, [gallery]);

  function handleDeleteGallery(id) {
    const deleteStatus = dispatch(galleryActions.delete(id));
    if(deleteStatus.type === "GALLERYS_DELETE_SUCCESS"){
      toast.success("✓ Gallery has been deleted successfully!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  const setActiveGallery = (gallery, index) => {
    setCurrentGallery(gallery);
    setCurrentIndex(index);
  };

  const deleteGallery = (id) => {

    confirmAlert({
      title: 'Delete This Gallery!',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: ' Yes, Delete it!',
          onClick: () => {
           handleDeleteGallery(id)
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
          <h4 className="breadcrumb-title">Galleries</h4>
          <ul className="db-breadcrumb-list">
            <li><Link to="/admin-index"><i className="fa fa-home" />Home</Link></li>
            <li>Galleries</li>
          </ul>
        </div>
        <CCard>                 
          <CCardHeader className="bg-info">
            All Galleries List
            <CButton
            className="btn btn-sm btn-success"
            style={{float:"right", border:'.001em solid #22963c'}}
            data-toggle="modal"
            data-target="#createGalleries"
            >
              <i style={{fontSize: '5px!important'}} className="fa fa-plus"></i><span> Add</span>
            </CButton>
          </CCardHeader>
          {
            galleries.items ?
            <CCardBody>    
              <table id="myTable" className="table table-striped table-bordered dataTable dtr-inline table-hover">
                  <thead>
                    <tr>
                      <th>SI</th>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th style={{width:"11%"}}>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      galleries.items &&
                      galleries.items.map((gallery, index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{gallery.title}</td>
                          <td><img src={customUrl+gallery.image} width="100"/></td>
                          <td><span className={gallery.active_status == 1 ? 'badge badge-success badge-pill' : 'badge badge-danger badge-pill'}>{gallery.active_status == 1? 'active' : 'inactive'}</span></td>
                          <td>{gallery.priority}</td>
                          <td>
                            <button 
                              className='btn btn-info btn-xs'
                              onClick={() => setActiveGallery(gallery, gallery.id)}
                              data-toggle="modal" data-target="#editModal"
                              >
                              <i class="fa fa-pencil-square-o"></i>
                            </button>
                            <button 
                                className='btn btn-danger btn-xs ml-1'
                                onClick={() => deleteGallery(gallery.id)}
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
                      <th>Image</th>
                      <th>Status</th>
                      <th>Priority</th>
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
        <CreateGallery/>
        {currentGallery ? (
          <EditGallery
            id = {currentGallery.id}
            title = {currentGallery.title}
            description = {currentGallery.description}
            created_by = {currentGallery.created_by}
            priority = {currentGallery.priority}
          />
        ) : 
        (
          <div></div>
        )}
    </div>

  );
};

export default GalleriesList;
