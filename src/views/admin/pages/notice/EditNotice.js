
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
  CInputCheckbox,
  CSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {apiUrl} from '../../../../reusable/apiHost';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import NoticeDataService from "../../../../_services/combined.service";
import { noticeActions } from '../../../../_actions/notice.action';
import { Alert } from "bootstrap";
import { authHeader } from "src/_helpers";
import ReactQuill from 'react-quill';
import toolbarOptions  from "src/reusable/toolbarOptions"
import { customUrl } from  "src/reusable/apiHost";

const EditNotice = props => {
  const user = useSelector(state => state.authentication.user);
  const initialNoticeState = {
    id          : props,
    title       : '',
    description : '',
    image       : '',
    updated_by  : user.firstName+' '+user.lastName,
    priority    : '',
    active_status: '',
  };
  const [currentNotice, setCurrentNotice] = useState(initialNoticeState);
  const description  = currentNotice.description;
  const [noticeImage, setNoticeImage] = useState("");
  const [imgData, setImgData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
  getNotice(props.id)
  }, [props.id]);
  
  const getNotice = id => {
    NoticeDataService.getNotice(id)
      .then(response => {
        setCurrentNotice(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });  
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentNotice({ ...currentNotice, [name]: value, updated_by  : user.firstName+' '+user.lastName });
  };

  function handleEditCheckChange(e){
    const { checked } = e.target;
    setCurrentNotice(currentNotice => ({ ...currentNotice, active_status: checked, updated_by  : user.firstName+' '+user.lastName }));
  }



  function handleDescChange (value){
    setCurrentNotice(currentNotice => ({ ...currentNotice, description: value, updated_by  : user.firstName+' '+user.lastName }));
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
    setCurrentNotice({ ...currentNotice, updated_by  : user.firstName+' '+user.lastName });
  };

  const updateNotice = () => {
    setSubmitted(true);
    if (currentNotice.title && currentNotice.description) {
        dispatch(noticeActions.update(currentNotice, noticeImage));
        $('#editModal').modal('hide');
        $('.modal-backdrop').remove();   
    }
  };
  return (
    <div>
      { currentNotice ? (
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
                {/* {
                  notice &&
                  notice.map((currentNotice, index) => ( */}
               
                  <CFormGroup row>
                    <CCol md="12">
                      <CFormGroup>
                          <CLabel htmlFor="title">Title <span className="requiredText">*</span></CLabel>
                          <CInput value={currentNotice.title} name='title' onChange={handleInputChange} placeholder="Enter Notice's Title." />
                      </CFormGroup>
                    </CCol>
                    <CCol md="12">
                      <CFormGroup>
                          <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
                          {/* <ReactQuill name="description" value={currentNotice.description} onChange={handleDescChange} className="ql-custom" modules={{ toolbar: toolbarOptions }}/> */}
                          <ReactQuill value={currentNotice.description}  modules={{ toolbar: toolbarOptions }}  name='description' onChange={handleDescChange} placeholder="Enter notice's description." />
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="image">Image</CLabel>
                          <CInput type="file"  onChange={handleImageChange} id="image"  />
                      </CFormGroup>
                      <div className="previewNoticeImage">
                      <p>Old Image</p>
                              <img width="80" src={customUrl+currentNotice.image} />
                      </div>
                      <div className="previewNoticeImage">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup>
                        <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                        <CInput value={currentNotice.priority} type="number" name='priority' onChange={handleInputChange} placeholder="Enter notice's priority." />
                      </CFormGroup>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup row>
                        <CCol style={{ color: currentNotice.active_status == 1? 'green': 'red'}} tag="label" sm="12" className="col-form-label">
                          {currentNotice.active_status == 1? " Active" : " Inactive"}
                        </CCol>
                        <CCol sm="12">
                          <CSwitch
                            className="mr-1"
                            color = {currentNotice.active_status == 1? "success" : "danger"}
                            checked = {currentNotice.active_status == 1? true : false}
                            onChange={handleEditCheckChange}
                            shape="pill"
                            variant="outline"
                          />
                        </CCol>
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