
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
// import SystemDataService from "../../../../_services/SystemService";
import { systemActions } from '../../../../_actions/system.action';

const EditSystem = props => {
  const user = useSelector(state => state.authentication.user);
  const initialSystemState = {
    id: props,
    systemName        : '',
    title             : '',
    email             : '',
    system_url        : '',
    phone_no          : '',
    mobile            : '',
    address           : '',
    active_status     : true,
    priority          : '',
    created_by        : user.firstName+' '+user.lastName
  };
  const [currentSystem, setCurrentSystem] = useState(initialSystemState);
  var system = useSelector(state => state.systems.currentSystem)
  const [systemImage, setSystemImage] = useState("");
  const [imgData, setImgData] = useState(null);
  const dispatch = useDispatch();

  const getSystem = id => {
    // SystemDataService.get(id)
    //   .then(response => {
    //     setCurrentSystem(response.data.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });  
};

  useEffect(() => {
    getSystem(props.id);
  }, [props.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentSystem({ ...currentSystem, [name]: value });
  };

  function handleDescChange (value){
    setCurrentSystem({ ...currentSystem, description: value });
  }

  const handleImageChange = e => {
    if (e.target.files[0]) {
        setSystemImage(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateSystem = () => {
    // setSubmitted(true);
    if (currentSystem.title && currentSystem.description) {
        dispatch(systemActions.update(currentSystem, systemImage));
        $('#editModal').modal('toggle');
        $('.modal-backdrop').remove();   
    }
  };
  return (
    <div>
      {currentSystem ? (
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title" id="editModal">Update This System</h5>
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
                          <CInput value={currentSystem.title}  id="title" name='title' onChange={handleInputChange} placeholder="Enter System's Title." />
                      </CFormGroup>
                    </CCol>
                    <CCol md="12">
                      <CFormGroup>
                          <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
                          {/* <ReactQuill name="description" value={currentSystem.description} onChange={handleDescChange} className="ql-custom" modules={{ toolbar: toolbarOptions }}/> */}
                          <CInput value={currentSystem.description} type="text"  name='description' onChange={handleInputChange} id="description" placeholder="Enter system's description." />
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="image">Image</CLabel>
                          <CInput type="file"  onChange={handleImageChange} id="image"  />
                      </CFormGroup>
                      <div className="previewSystemImage">
                      <p>Old Image</p>
                              <img width="80" src={currentSystem.image} />
                      </div>
                      <div className="previewSystemImage">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                        <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                        <CInput value={currentSystem.priority} type="number" name='priority' onChange={handleInputChange} id="priority" placeholder="Enter system's priority." />
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <div style={{textAlign: 'center'}}>
                    <CButton onClick={updateSystem} size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
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
          <p>Please Select a System...</p>
        </div>
      )}
    </div>
  );
};

export default EditSystem;