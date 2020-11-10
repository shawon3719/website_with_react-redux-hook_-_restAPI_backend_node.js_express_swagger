/**
* Fetch, update and create Sliders data from database using API.
* Send data of specific id to edit page.
* Handle delete method
* React and JSX
* @version React 16.5.2
* @author [Masudul Hasan Shawon](masudul@atilimited.ne* 
*/

import React, { useState, useEffect } from "react";
import SliderDataService from "../../../../_services/SliderService";
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

const SlidersList = props => {
  const [sliders, setSliders] = useState([]);
  const [currentSlider, setCurrentSlider] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveSliders();
  }, []);

  const retrieveSliders = () => {
    SliderDataService.getAll()
    .then(response => {
      setSliders(response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const refreshList = () => {
    retrieveSliders();
  };

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
            SliderDataService.remove(id)
            .then(response => {
              toast.success("✓ "+response.data.message+"!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
              });
              refreshList();
            })
            .catch(e => {
              console.log(e);
            });
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
          <CCardBody>    
              <table id="myTable" className="table table-striped table-bordered dataTable dtr-inline table-hover">
                <thead>
                  <tr>
                    <th>SI</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>priority</th>
                    <th style={{width:"11%"}}>Action</th>
                  </tr>
                </thead>
                <tbody >
                  {
                    sliders &&
                    sliders.map((slider, index) => (
                      <tr>
                        <td>{index+1}</td>
                        <td>{slider.title}</td>
                        <td>{slider.description}</td>
                        <td><img src={slider.image} width="100"/></td>
                        <td>{slider.priority}</td>
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
                              //  onClick={this.showconfDelAlert.bind(this,cat.categoryId)}
                              >
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
                    <th>priority</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            
          </CCardBody>
        </CCard>
        <CreateSlider
          // saveModalDetails={this.saveModalDetails}
        />
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
