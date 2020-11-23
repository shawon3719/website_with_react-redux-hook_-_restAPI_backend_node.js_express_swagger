
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {apiUrl} from '../../../../reusable/apiHost';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
// import NoticeDataService from "../../../../_services/NoticeService";
import { noticeActions } from '../../../../_actions/notice.action';
import { Alert } from "bootstrap";
import { authHeader } from "src/_helpers";
import ReactQuill from 'react-quill';
import toolbarOptions  from "src/reusable/toolbarOptions"

const EditNotice = props => {
  const initialNoticeState = {
    id: props,
    title       : '',
    description : '',
    image : '',
    created_by  : localStorage.getItem('profile_name'),
    priority    : ''
  };
  const [currentNotice, setCurrentNotice] = useState(initialNoticeState);
  // const [desc, setDescription] = useState(initialNoticeState);
  var notice = useSelector(state => state.notices.currentNotice)
  const [noticeImage, setNoticeImage] = useState("");
  const [imgData, setImgData] = useState(null);
  const dispatch = useDispatch();
  // const [submitted, setSubmitted] = useState(false);

  const getNotice = id => {
    // NoticeDataService.get(id)
    //   .then(response => {
    //     setCurrentNotice(response.data.data);
    //     // setDescription(response.data.data.description);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });  
};

  useEffect(() => {
    getNotice(props.id);
  }, [props.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentNotice({ ...currentNotice, [name]: value });
  };

  function handleDescChange (value){
    setCurrentNotice({ ...currentNotice, description: value });
  }

  const handleImageChange = e => {
    if (e.target.files[0]) {
        setNoticeImage(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateNotice = () => {
    // setSubmitted(true);
    if (currentNotice.title && currentNotice.description) {
        dispatch(noticeActions.update(currentNotice, noticeImage));
        $('#editModal').modal('toggle');
        $('.modal-backdrop').remove();   
    }
  };
  return (
    <div>
      {currentNotice ? (
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title" id="editModal">Update This Notice</h5>
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
                          <CInput value={currentNotice.title}  id="title" name='title' onChange={handleInputChange} placeholder="Enter Notice's Title." />
                      </CFormGroup>
                    </CCol>
                    <CCol md="12">
                      <CFormGroup>
                          <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
                          {/* <ReactQuill name="description" value={currentNotice.description} onChange={handleDescChange} className="ql-custom" modules={{ toolbar: toolbarOptions }}/> */}
                          <CInput value={currentNotice.description} type="text"  name='description' onChange={handleInputChange} id="description" placeholder="Enter notice's description." />
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="image">Image</CLabel>
                          <CInput type="file"  onChange={handleImageChange} id="image"  />
                      </CFormGroup>
                      <div className="previewNoticeImage">
                      <p>Old Image</p>
                              <img width="80" src={currentNotice.image} />
                      </div>
                      <div className="previewNoticeImage">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                        <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                        <CInput value={currentNotice.priority} type="number" name='priority' onChange={handleInputChange} id="priority" placeholder="Enter notice's priority." />
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <div style={{textAlign: 'center'}}>
                    <CButton onClick={updateNotice} size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
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
          <p>Please Select a Notice...</p>
        </div>
      )}
    </div>
  );
};

export default EditNotice;

















// class editNotice extends Component {
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
//             notices     : [],
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
        
//         fetch(apiUrl+"notices/create", requestOptions)
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
//                                             <CInput value={this.state.title} className={errors.title} id="title" name='title' onChange={this.handleChange} placeholder="Enter Notice's Title." />
//                                         </CFormGroup>
//                                     </CCol>
//                                     <CCol md="6">
//                                         <CFormGroup>
//                                             <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
//                                             <CInput value={this.state.description} type="text" className={errors.description} name='description' onChange={this.handleChange} id="description" placeholder="Enter notice's description." />
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
//                                             <CInput value={this.state.priority} type="number" className={errors.priority} name='priority' onChange={this.handleChange} id="priority" placeholder="Enter notice's priority." />
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

// export default editNotice;