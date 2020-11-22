import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { galleryActions } from '../../../../_actions/gallery.action';
// import GalleryDataService from "../../../../_services/GalleryService";
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CInputCheckbox,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {apiUrl} from '../../../../reusable/apiHost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authHeader } from '../../../../_helpers';
import $ from 'jquery';
import ReactQuill from 'react-quill';
import toolbarOptions  from "src/reusable/toolbarOptions"
import { userActions } from 'src/_actions';

function CreateGallery() {
  const user = useSelector(state => state.authentication.user);
    const initialGalleryState = {
      title             : '',
      active_status     : true,
      created_by        : user.firstName+' '+user.lastName,
      priority          : ''
    };
    const [gallery, setGallery] = useState(initialGalleryState);
    const [submitted, setSubmitted] = useState(false);
    const [state, setinitialState] = useState(false);
    const submitting = useSelector(state => state.galleries.loading);
    const [galleryImage, setGalleryImage] = useState(null);
    const [imgData, setImgData] = useState(null);
    const isLoggedIn = useSelector((state) => state.authentication.loggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
      if(isLoggedIn != true){
        dispatch(userActions.logout());
        window.location.href = "/#/admin"
      }else{
      setSubmitted(false);
      }

    }, [state]);


    function resetForm(e) {
      e.preventDefault();
      setGallery(initialGalleryState);
      setGalleryImage(false);
      setImgData(null);
      $('#createForm input[type=file]').val('')
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setGallery(gallery => ({ ...gallery, [name]: value }));
    }

    function handleCheckChange(e) {
      const { name, checked } = e.target;
      setGallery(gallery => ({ ...gallery, [name]: checked }));
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
    };

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        setinitialState(true);
        if (gallery.title) {
            dispatch(galleryActions.create(gallery, galleryImage));   
            $('#createGalleries').modal('toggle');
            $('.modal-backdrop').remove(); 
        }
    }

    return (

      <div className="modal fade" id="createGalleries" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title" id="createGalleries">Create New Gallery</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CForm id="createForm" onSubmit={handleSubmit}>
                  <CFormGroup row>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="title">Title <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !gallery.title ? ' is-invalid' : '')} value={gallery.title} id="title" name='title' onChange={handleChange} placeholder="Enter Gallery's Title." />
                          {submitted && !gallery.title &&
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
                          <CInput type="number" value={gallery.priority} name='priority'  onChange={handleChange} id="priority" placeholder="Enter gallery's priority."  className={'form-control' + (submitted && !gallery.priority ? ' is-invalid' : '')} />
                          {submitted && !gallery.priority &&
                              <div className="invalid-feedback">Gallery priority is required</div>
                          }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                          <CInputCheckbox
                              id="activeStatus"
                              name="active_status"
                              checked={gallery.active_status}
                              onChange={handleCheckChange}
                              custom
                          />
                          <CLabel variant="custom-checkbox" htmlFor="activeStatus">
                          Active
                          </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <div style={{textAlign: 'center'}}>
                    <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" />
                    {submitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Submit
                    </CButton>
                    {" "}
                    <CButton type="reset" onClick={resetForm} size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                  </div>
                </CForm>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default CreateGallery ;
