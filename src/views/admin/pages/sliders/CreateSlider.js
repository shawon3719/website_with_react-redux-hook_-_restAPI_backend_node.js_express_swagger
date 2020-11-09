// import React, { Component } from 'react';
// import {
//     CButton,
//     CCol,
//     CForm,
//     CFormGroup,
//     CInput,
//     CLabel,
//     CSelect,
//   } from '@coreui/react'
//   import CIcon from '@coreui/icons-react';
//   import {apiUrl} from '../../../../reusable/apiHost';
//   import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
//   import $ from 'jquery';

// class createSlider extends Component {
//     constructor(props) 
//     {
//         super(props);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.handleImageChange = this.handleImageChange.bind(this);
//         this.state = 
//         {
//             title       : '',
//             description : '',
//             image       : '',
//             created_by  : localStorage.getItem('profile_name'),
//             priority    : '',
//             sliders     : [],
//             errors      : 
//                         {
//                             title: '',
//                             description: '',
//                             priority    : '',
//                             image: ''
//                         }
//         }
//     }

//     checkValidate = () => {
        
//         if (this.state.title != '' && this.state.description != '' && this.state.image != '' && this.state.priority != '') {
//           return true;
//         }
//         else{
//             return false;
//         }
//     }


//     handleImageChange(e){
//         e.preventDefault();
//         this.setState({image: e.target.files[0]})
//     }

//     handleChange = (event) => {
//         event.preventDefault();
//         const { name, value } = event.target;
//         let errors = this.state.errors;
//         switch (name) {
//           case 'title': 
//             errors.title = 
//               value.length < 1
//                 ? 'is-invalid'
//                 : 'is-valid';
//             break;
//           case 'description': 
//             errors.description = 
//             value.length < 1
//               ? 'is-invalid'
//               : 'is-valid';
//           break;
//           case 'priority': 
//             errors.priority = 
//             value.length < 1
//               ? 'is-invalid'
//               : 'is-valid';
//           break;
//           case 'image': 
//           errors.image = 
//           value.length < 1
//             ? 'is-invalid'
//             : 'is-valid';
//         break;
//         default:
//         break;
//         }
    
//         this.setState(
//             {
//                 errors, [name]: value,
//                 [event.target.name]: event.target.value
//             });
//       }

//       onSubmit(e){
//         e.preventDefault();
//         const token = localStorage.getItem('x-auth-token');
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", "Bearer "+token);
        
//         var formdata = new FormData();
//         formdata.append("title", this.state.title);
//         formdata.append("description", this.state.description);
//         formdata.append("image", this.state.image, this.state.image.name);
//         formdata.append("created_by", this.state.created_by);
//         formdata.append("priority", this.state.priority);
        
//         var requestOptions = {
//           method: 'POST',
//           headers: myHeaders,
//           body: formdata,
//           redirect: 'follow'
//         };
        
//         fetch(apiUrl+"sliders/create", requestOptions)
//           .then(response => response.text())
//           .then((response) => {
//             var obj = JSON.parse(response);
//             toast.success("✓ "+obj.message+"!",{
//               position: "top-right",
//               autoClose: 5000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true
//             });
//         })
//           .catch(error => console.log('error', error));

//       }
    
//     render() {
//         const {errors} = this.state;
//         return (
//             <div className="modal fade" id="createSliders" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <ToastContainer />
//                 <div className="modal-dialog modal-lg" role="document">
//                     <div className="modal-content">
//                         <div className="modal-header bg-success text-white">
//                             <h5 className="modal-title" id="createSliders">Create New Base Link</h5>
//                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                                 <span aria-hidden="true">&times;</span>
//                             </button>
//                         </div>
//                         <div className="modal-body">
//                             <CForm noValidate onSubmit={this.onSubmit}>
//                                 <CFormGroup row>
//                                     <CCol md="6">
//                                         <CFormGroup>
//                                             <CLabel htmlFor="title">Title <span className="requiredText">*</span></CLabel>
//                                             <CInput className={errors.title} id="title" name='title' onChange={this.handleChange} placeholder="Enter Slider's Title." />
//                                         </CFormGroup>
//                                     </CCol>
//                                     <CCol md="6">
//                                         <CFormGroup>
//                                             <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
//                                             <CInput type="text" className={errors.description} name='description' onChange={this.handleChange} id="description" placeholder="Enter slider's description." />
//                                         </CFormGroup>
//                                     </CCol>
//                                     <CCol md="6">
//                                         <CFormGroup>
//                                             <CLabel htmlFor="image">Image</CLabel>
//                                             <CInput type="file" className={errors.image} onChange={this.handleImageChange} id="image"  />
//                                         </CFormGroup>
//                                     </CCol>
//                                     <CCol md="6">
//                                         <CFormGroup>
//                                             <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
//                                             <CInput type="number" className={errors.priority} name='priority' onChange={this.handleChange} id="priority" placeholder="Enter slider's priority." />
//                                         </CFormGroup>
//                                     </CCol>
//                                 </CFormGroup>
//                                 <div style={{textAlign: 'center'}}>
//                                     <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
//                                     {" "}
//                                     <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
//                                 </div>
//                             </CForm>
            
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default createSlider;


import React, { useState } from "react";
import SliderDataService from "../../../../_services/SliderService";
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {apiUrl} from '../../../../reusable/apiHost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authHeader } from '../../../../_helpers';
import $ from 'jquery';

const AddSlider = () => {
  const initialSliderState = {
    title       : '',
    description : '',
    image       : '',
    created_by  : localStorage.getItem('profile_name'),
    priority    : ''
  };
  const [sliderImage, setSliderImage] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [slider, setSlider] = useState(initialSliderState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSlider({ ...slider, [name]: value });
  };

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

  const saveSlider = () => {
        // const token = localStorage.getItem('token');
        var formdata = new FormData();
        formdata.append("title", slider.title);
        formdata.append("description",slider.description);
        formdata.append("image", sliderImage, sliderImage.name);
        formdata.append("created_by", slider.created_by);
        formdata.append("priority", slider.priority);
        
        var requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: formdata,
          redirect: 'follow'
        };
    fetch(apiUrl+"sliders/create", requestOptions)
              .then(response => response.text())
              .then((response) => {
                var obj = JSON.parse(response);
                $('#createSliders').modal('toggle');
                $('.modal-backdrop').remove();
                toast.success("✓ "+obj.message+"!",{
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true
                });
                setSlider({
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published
                  });
                  setSubmitted(true);
                  console.log(response.data);
            })
              .catch(error => console.log('error', error));
  };

  const newSlider = () => {
    setSlider(initialSliderState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newSlider}>
            Add
          </button>
        </div>
      ) : (
        <div className="modal fade" id="createSliders" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title" id="createSliders">Create New Base Link</h5>
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
                          <CInput value={slider.title} id="title" name='title' onChange={handleInputChange} placeholder="Enter Slider's Title." />
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
                          <CInput type="text"  value={slider.description} name='description' onChange={handleInputChange} id="description" placeholder="Enter slider's description." />
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="image">Image</CLabel>
                          <CInput type="file" name="image"  onChange={handleImageChange} id="sliderImage"  />
                      </CFormGroup>
                      <div className="previewSliderImage">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={slider.priority} name='priority'  onChange={handleInputChange} id="priority" placeholder="Enter slider's priority." />
                        </CFormGroup>
                      </CCol>
                  </CFormGroup>
                  <div style={{textAlign: 'center'}}>
                    <CButton onClick={saveSlider} size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
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
      )}
    </div>





  );
};

export default AddSlider;
