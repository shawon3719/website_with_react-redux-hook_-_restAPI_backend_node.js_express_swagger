
import React, { useState, useEffect } from "react";
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
  import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import $ from 'jquery';
  import SliderDataService from "../../../../_services/SliderService";
import { Alert } from "bootstrap";
import { authHeader } from "src/_helpers";
import SlidersList from "./Sliders";

const EditSlider = props => {
  const initialSliderState = {
    id: props,
    title       : '',
    description : '',
    image : '',
    created_by  : localStorage.getItem('profile_name'),
    priority    : ''
  };
  const [currentSlider, setCurrentSlider] = useState(initialSliderState);
  const [sliderImage, setSliderImage] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [message, setMessage] = useState("");

  const getSlider = id => {
    SliderDataService.get(id)
      .then(response => {
          var obj = JSON.stringify(response.data.data);
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
    setCurrentSlider({ ...currentSlider, [name]: value });
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

  const updateSlider = () => {
    var formdata = new FormData();
    formdata.append("id", currentSlider.id);
    formdata.append("title", currentSlider.title);
    formdata.append("description", currentSlider.description);
    formdata.append("image", sliderImage, sliderImage.name);
    formdata.append("priority", currentSlider.priority);
    
    var requestOptions = {
      method: 'PATCH',
      headers: authHeader(),
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(apiUrl+"sliders/update", requestOptions)
    .then(response => response.text())
      .then(response => {
        var obj = JSON.parse(response)
        toast.success("✓ "+obj.message+"!",{
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true
                      });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentSlider ? (
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                {/* <ToastContainer /> */}
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title" id="editModal">Create New Base Link</h5>
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
                                            <CInput value={currentSlider.title}  id="title" name='title' onChange={handleInputChange} placeholder="Enter Slider's Title." />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
                                            <CInput value={currentSlider.description} type="text"  name='description' onChange={handleInputChange} id="description" placeholder="Enter slider's description." />
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
                                    <CCol md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                                            <CInput value={currentSlider.priority} type="number" name='priority' onChange={handleInputChange} id="priority" placeholder="Enter slider's priority." />
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
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default EditSlider;

















// class editSlider extends Component {
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
//             created_by  : "admin",
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


//       componentWillReceiveProps(nextProps) {
//         this.setState({
//             title: nextProps.title,
//             description: nextProps.description,
//             created_by: nextProps.created_by,
//             priority: nextProps.priority,
//         });
//     }



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
//             <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <ToastContainer />
//                 <div className="modal-dialog modal-lg" role="document">
//                     <div className="modal-content">
//                         <div className="modal-header bg-success text-white">
//                             <h5 className="modal-title" id="editModal">Create New Base Link</h5>
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
//                                             <CInput value={this.state.title} className={errors.title} id="title" name='title' onChange={this.handleChange} placeholder="Enter Slider's Title." />
//                                         </CFormGroup>
//                                     </CCol>
//                                     <CCol md="6">
//                                         <CFormGroup>
//                                             <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
//                                             <CInput value={this.state.description} type="text" className={errors.description} name='description' onChange={this.handleChange} id="description" placeholder="Enter slider's description." />
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
//                                             <CInput value={this.state.priority} type="number" className={errors.priority} name='priority' onChange={this.handleChange} id="priority" placeholder="Enter slider's priority." />
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

// export default editSlider;