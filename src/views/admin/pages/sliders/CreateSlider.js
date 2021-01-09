import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { sliderActions } from '../../../../_actions/slider.action';
// import SliderDataService from "../../../../_services/SliderService";
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

function CreateSlider() {
    const user = useSelector(state => state.authentication.user);
    const initialSliderState = {
      title             : '',
      description       : '',
      image             : '',
      created_by        : user.firstName+' '+user.lastName,
      priority          : '',
      active_status     : true
    };
    const [slider, setSlider] = useState(initialSliderState);
    const [submitted, setSubmitted] = useState(false);
    const [state, setinitialState] = useState(false);
    const submitting = useSelector(state => state.sliders.loading);
    const [sliderImage, setSliderImage] = useState(null);
    const [imgData, setImgData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
      setSubmitted(false);
    }, [state]);


    function resetForm(e) {
      e.preventDefault();
      setSlider(initialSliderState);
      setSliderImage(false);
      setImgData(null);
      $('#createForm input[type=file]').val('')
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setSlider(slider => ({ ...slider, [name]: value }));
    }
    function handleCheckChange(e) {
      const { name, checked } = e.target;
      setSlider(slider => ({ ...slider, [name]: checked }));
    }

    function handleDescChange(value) {
      setSlider(slider => ({ ...slider, description: value }));
    }

    const handleImageChange = e => {
      if (e.target.files[0]) {
          setSliderImage(e.target.files[0]);
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
        if (slider.title && slider.description) {
            dispatch(sliderActions.create(slider, sliderImage));   
            $('#createSliders').modal('toggle');
            $('.modal-backdrop').remove(); 
        }
    }

    return (

      <div className="modal fade" id="createSliders" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title" id="createSliders">Create New Slider</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CForm id="createForm" onSubmit={handleSubmit}>
                  <CFormGroup row>
                    <CCol md="12">
                      <CFormGroup>
                          <CLabel htmlFor="title">Title <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !slider.title ? ' is-invalid' : '')} value={slider.title} id="title" name='title' onChange={handleChange} placeholder="Enter Slider's Title." />
                          {submitted && !slider.title &&
                                <div className="invalid-feedback">Title is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="12">
                      <CFormGroup>
                          <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
                          <ReactQuill name="description" value={slider.description} onChange={handleDescChange} className={'ql-custom' + (submitted && !slider.description ? ' is-invalid' : '')} modules={{ toolbar: toolbarOptions }}/>
                            {submitted && !slider.description &&
                                <div className="invalid-feedback">Description is required</div>
                            }
                          </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="image">Image</CLabel>
                          <CInput type="file" name="image"  onChange={handleImageChange} id="sliderImage"  />
                          {/* {submitted && !slider.image &&
                                <div className="invalid-feedback">Slider image is required</div>
                            } */}
                      </CFormGroup>
                      <div className="previewSliderImage">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={slider.priority} name='priority'  onChange={handleChange} id="priority" placeholder="Enter slider's priority."  className={'form-control' + (submitted && !slider.priority ? ' is-invalid' : '')} />
                            {submitted && !slider.priority &&
                                <div className="invalid-feedback">Slider priority is required</div>
                            }
                        </CFormGroup>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                            <CInputCheckbox
                                id="activeStatus"
                                name="active_status"
                                checked={slider.active_status}
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

export default CreateSlider ;
