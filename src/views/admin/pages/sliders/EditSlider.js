
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
import {apiUrl} from '../../../../reusable/apiHost';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import SliderDataService from "../../../../_services/combined.service";
import { sliderActions } from '../../../../_actions/slider.action';
import { Alert } from "bootstrap";
import { authHeader } from "src/_helpers";
import ReactQuill from 'react-quill';
import toolbarOptions  from "src/reusable/toolbarOptions"

const EditSlider = props => {
  const user = useSelector(state => state.authentication.user);
  const initialSliderState = {
    id: props,
    title       : '',
    description : '',
    image       : '',
    updated_by  : user.firstName+' '+user.lastName,
    priority    : ''
  };
  const [currentSlider, setCurrentSlider] = useState(initialSliderState);
  var slider = useSelector(state => state.sliders.currentSlider)
  const [sliderImage, setSliderImage] = useState("");
  const [imgData, setImgData] = useState(null);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const getSlider = id => {
    SliderDataService.getSlider(id)
      .then(response => {
        setCurrentSlider(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });  
};

  useEffect(() => {
    getSlider(props.id);
  }, [props.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentSlider({ ...currentSlider, [name]: value, updated_by  : user.firstName+' '+user.lastName });
  };

  function handleEditCheckChange(e){
    const { checked } = e.target;
    setCurrentSlider(currentSlider => ({ ...currentSlider, active_status: checked, updated_by  : user.firstName+' '+user.lastName }));
  }

  function handleDescChange (value){
    setCurrentSlider(currentSlider => ({ ...currentSlider, description: value, updated_by  : user.firstName+' '+user.lastName }));
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
    setCurrentSlider({ ...currentSlider, updated_by  : user.firstName+' '+user.lastName });
  };

  const updateSlider = () => {
    setSubmitted(true);
    if (currentSlider.title && currentSlider.description) {
        dispatch(sliderActions.update(currentSlider, sliderImage));
        $('#editModal').modal('toggle');
        $('.modal-backdrop').remove();   
    }
  };
  return (
    <div>
      {currentSlider ? (
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title" id="editModal">Update This Slider</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CForm >
                  <CFormGroup row>
                    <CCol md="12">
                      <CFormGroup>
                          <CLabel htmlFor="title">Title <span className="requiredText">*</span></CLabel>
                          <CInput value={currentSlider.title}  name='title' onChange={handleInputChange} placeholder="Enter Slider's Title." />
                      </CFormGroup>
                    </CCol>
                    <CCol md="12">
                      <CFormGroup>
                          <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
                          <ReactQuill name="description" value={currentSlider.description} onChange={handleDescChange} className="ql-custom" modules={{ toolbar: toolbarOptions }}/>
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="image">Image</CLabel>
                          <CInput type="file"  onChange={handleImageChange} id="image"  />
                      </CFormGroup>
                      <div className="previewSliderImage">
                      <p>Old Image</p>
                              <img width="80" src={currentSlider.image} />
                      </div>
                      <div className="previewSliderImage">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup>
                        <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                        <CInput value={currentSlider.priority} type="number" name='priority' onChange={handleInputChange} placeholder="Enter slider's priority." />
                      </CFormGroup>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup row>
                        <CCol style={{ color: currentSlider.active_status == 1? 'green': 'red'}} tag="label" sm="12" className="col-form-label">
                          {currentSlider.active_status == 1? " Active" : " Inactive"}
                        </CCol>
                        <CCol sm="12">
                          <CSwitch
                            className="mr-1"
                            color = {currentSlider.active_status == 1? "success" : "danger"}
                            checked = {currentSlider.active_status == 1? true : false}
                            onChange={handleEditCheckChange}
                            shape="pill"
                            variant="outline"
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <div style={{textAlign: 'center'}}>
                    <CButton onClick={updateSlider} size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
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
          <p>Please Select a Slider...</p>
        </div>
      )}
    </div>
  );
};

export default EditSlider;