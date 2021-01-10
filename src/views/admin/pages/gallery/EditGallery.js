
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {apiUrl, customUrl} from '../../../../reusable/apiHost';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import GalleryDataService from "../../../../_services/combined.service";
import { galleryActions } from '../../../../_actions/gallery.action';
import { Alert } from "bootstrap";
import { authHeader } from "src/_helpers";
import ReactQuill from 'react-quill';
import toolbarOptions  from "src/reusable/toolbarOptions"

const EditGallery = props => {
  const user = useSelector(state => state.authentication.user);
  const initialGalleryState = {
    id: props,
    title             : '',
    active_status     : true,
    created_by        : user.firstName+' '+user.lastName,
    priority          : ''
  };
  const [currentGallery, setCurrentGallery] = useState(initialGalleryState);
  var gallery = useSelector(state => state.galleries.currentGallery)
  const [galleryImage, setGalleryImage] = useState("");
  const [imgData, setImgData] = useState(null);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const getGallery = id => {
    GalleryDataService.getGallery(id)
      .then(response => {
        setCurrentGallery(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });  
};

  useEffect(() => {
    getGallery(props.id);
  }, [props.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentGallery({ ...currentGallery, [name]: value, updated_by  : user.firstName+' '+user.lastName });
  };

  function handleEditCheckChange(e){
    const { checked } = e.target;
    setCurrentGallery(currentGallery => ({ ...currentGallery, active_status: checked, updated_by  : user.firstName+' '+user.lastName }));
  }

  const handleImageChange = e => {
    if (e.target.files[0]) {
        setGalleryImage(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
    }
    setCurrentGallery({ ...currentGallery, updated_by  : user.firstName+' '+user.lastName });
  };

  const updateGallery = () => {
    setSubmitted(true);
    if (currentGallery.title && currentGallery.priority) {
        dispatch(galleryActions.update(currentGallery, galleryImage));
        $('#editModal').modal('toggle');
        $('.modal-backdrop').remove();   
    }
  };
  return (
    <div>
      {currentGallery ? (
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title" id="editModal">Update This Gallery</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CForm >
                <CFormGroup row>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="title">Title <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !currentGallery.title ? ' is-invalid' : '')} value={currentGallery.title} id="title" name='title' onChange={handleInputChange} placeholder="Enter Gallery's Title." />
                          {submitted && !currentGallery.title &&
                                <div className="invalid-feedback">Title is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="image">Image</CLabel>
                          <CInput type="file" name="image"  onChange={handleImageChange} id="galleryImage"  />
                          {/* {submitted && !gallery.image &&
                                <div className="invalid-feedback">Gallery image is required</div>
                            } */}
                      </CFormGroup>
                      <div className="previewGalleryImage">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                          <CInput type="number" value={currentGallery.priority} name='priority'  onChange={handleInputChange} id="priority" placeholder="Enter gallery's priority."  className={'form-control' + (submitted && !currentGallery.priority ? ' is-invalid' : '')} />
                          {submitted && !currentGallery.priority &&
                              <div className="invalid-feedback">Gallery priority is required</div>
                          }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup row>
                        <CCol style={{ color: currentGallery.active_status == 1? 'green': 'red'}} tag="label" sm="12" className="col-form-label">
                          {currentGallery.active_status == 1? " Active" : " Inactive"}
                        </CCol>
                        <CCol sm="12">
                          <CSwitch
                            className="mr-1"
                            color = {currentGallery.active_status == 1? "success" : "danger"}
                            checked = {currentGallery.active_status == 1? true : false}
                            onChange={handleEditCheckChange}
                            shape="pill"
                            variant="outline"
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <div style={{textAlign: 'center'}}>
                    <CButton onClick={updateGallery} size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
                    {" "}
                    <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                  </div>
                  </CForm>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        </div>
      ) : 
      (
        <div>
          <br />
          <p>Please Select a Gallery...</p>
        </div>
      )}
    </div>
  );
};

export default EditGallery;