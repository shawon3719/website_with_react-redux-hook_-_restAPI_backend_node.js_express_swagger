// import React, { useState } from "react";
// import SliderDataService from "../../../../_services/SliderService";
// import {
//   CButton,
//   CCol,
//   CForm,
//   CFormGroup,
//   CInput,
//   CLabel,
//   CSelect,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react';
// import {apiUrl} from '../../../../reusable/apiHost';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { authHeader } from '../../../../_helpers';
// import $ from 'jquery';

// const AddSlider = () => {
//   const initialSliderState = {
//     title       : '',
//     description : '',
//     image       : '',
//     created_by  : localStorage.getItem('profile_name'),
//     priority    : ''
//   };
//   const [sliderImage, setSliderImage] = useState(null);
//   const [imgData, setImgData] = useState(null);
//   const [slider, setSlider] = useState(initialSliderState);
//   const [submitted, setSubmitted] = useState(false);

//   const handleInputChange = event => {
//     const { name, value } = event.target;
//     setSlider({ ...slider, [name]: value });
//   };

//   const handleImageChange = e => {
//     if (e.target.files[0]) {
//         setSliderImage(e.target.files[0]);
//         const reader = new FileReader();
//         reader.addEventListener("load", () => {
//           setImgData(reader.result);
//         });
//         reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const saveSlider = () => {
//         // const token = localStorage.getItem('token');
//         var formdata = new FormData();
//         formdata.append("title", slider.title);
//         formdata.append("description",slider.description);
//         formdata.append("image", sliderImage, sliderImage.name);
//         formdata.append("created_by", slider.created_by);
//         formdata.append("priority", slider.priority);
        
//         var requestOptions = {
//           method: 'POST',
//           headers: authHeader(),
//           body: formdata,
//           redirect: 'follow'
//         };
//     fetch(apiUrl+"sliders/create", requestOptions)
//               .then(response => response.text())
//               .then((response) => {
//                 var obj = JSON.parse(response);
//                 $('#createSliders').modal('toggle');
//                 $('.modal-backdrop').remove();
//                 toast.success("✓ "+obj.message+"!",{
//                   position: "top-right",
//                   autoClose: 5000,
//                   hideProgressBar: false,
//                   closeOnClick: true,
//                   pauseOnHover: true
//                 });
//                 setSlider({
//                     title: response.data.title,
//                     description: response.data.description,
//                     published: response.data.published
//                   });
//                   setSubmitted(true);
//                   console.log(response.data);
//             })
//               .catch(error => console.log('error', error));
//   };

//   const newSlider = () => {
//     setSlider(initialSliderState);
//     setSubmitted(false);
//   };

//   return (
//     <div className="submit-form">
//       {submitted ? (
//         <div>
//           <h4>You submitted successfully!</h4>
//           <button className="btn btn-success" onClick={newSlider}>
//             Add
//           </button>
//         </div>
//       ) : (
//         <div className="modal fade" id="createSliders" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header bg-success text-white">
//                 <h5 className="modal-title" id="createSliders">Create New Base Link</h5>
//                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <CForm >
//                   <CFormGroup row>
//                     <CCol md="6">
//                       <CFormGroup>
//                           <CLabel htmlFor="title">Title <span className="requiredText">*</span></CLabel>
//                           <CInput value={slider.title} id="title" name='title' onChange={handleInputChange} placeholder="Enter Slider's Title." />
//                       </CFormGroup>
//                     </CCol>
//                     <CCol md="6">
//                       <CFormGroup>
//                           <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
//                           <CInput type="text"  value={slider.description} name='description' onChange={handleInputChange} id="description" placeholder="Enter slider's description." />
//                       </CFormGroup>
//                     </CCol>
//                     <CCol md="6">
//                       <CFormGroup>
//                           <CLabel htmlFor="image">Image</CLabel>
//                           <CInput type="file" name="image"  onChange={handleImageChange} id="sliderImage"  />
//                       </CFormGroup>
//                       <div className="previewSliderImage">
//                               <img width="80" src={imgData} />
//                       </div>
//                     </CCol>
//                     <CCol md="6">
//                         <CFormGroup>
//                             <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
//                             <CInput type="number" value={slider.priority} name='priority'  onChange={handleInputChange} id="priority" placeholder="Enter slider's priority." />
//                         </CFormGroup>
//                       </CCol>
//                   </CFormGroup>
//                   <div style={{textAlign: 'center'}}>
//                     <CButton onClick={saveSlider} size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
//                     {" "}
//                     <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
//                   </div>
//                 </CForm>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>

//   );
// };

// export default AddSlider;



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
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {apiUrl} from '../../../../reusable/apiHost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authHeader } from '../../../../_helpers';
import $ from 'jquery';

function CreateSlider() {
    // const [slider, setSlider] = useState({
    //   title       : '',
    //   description : '',
    //   created_by  : 'admin',
    //   priority    : ''
    // });
    const initialSliderState = {
      title       : '',
      description : '',
      image : '',
      created_by  : localStorage.getItem('profile_name'),
      priority    : ''
    };
    const [slider, setSlider] = useState(initialSliderState);
    const [submitted, setSubmitted] = useState(false);
    const [state, setinitialState] = useState(false);
    const registering = useSelector(state => state.registration.registering);
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
                <h5 className="modal-title" id="createSliders">Create New Base Link</h5>
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
                          <CInput className={'form-control' + (submitted && !slider.title ? ' is-invalid' : '')} value={slider.title} id="title" name='title' onChange={handleChange} placeholder="Enter Slider's Title." />
                          {submitted && !slider.title &&
                                <div className="invalid-feedback">Title is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
                          <CInput type="text" name="description" value={slider.description} onChange={handleChange} className={'form-control' + (submitted && !slider.description ? ' is-invalid' : '')} />
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
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={slider.priority} name='priority'  onChange={handleChange} id="priority" placeholder="Enter slider's priority."  className={'form-control' + (submitted && !slider.priority ? ' is-invalid' : '')} />
                            {submitted && !slider.priority &&
                                <div className="invalid-feedback">Slider priority is required</div>
                            }
                        </CFormGroup>
                      </CCol>
                  </CFormGroup>
                  <div style={{textAlign: 'center'}}>
                    <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" />
                    {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
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
