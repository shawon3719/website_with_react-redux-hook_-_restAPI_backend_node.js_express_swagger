import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { noticeActions } from '../../../../_actions/notice.action';
// import NoticeDataService from "../../../../_services/NoticeService";
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

function CreateNotice() {
  const user = useSelector(state => state.authentication.user);
    const initialNoticeState = {
      title       : '',
      description : '',
      image : '',
      created_by  : user.firstName+' '+user.lastName,
      priority    : '',
      active_status     : true,
    };
    const [notice, setNotice] = useState(initialNoticeState);
    const [submitted, setSubmitted] = useState(false);
    const [state, setinitialState] = useState(false);
    const submitting = useSelector(state => state.notices.loading);
    const [noticeImage, setNoticeImage] = useState(null);
    const [imgData, setImgData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
      setSubmitted(false);
    }, [state]);


    function resetForm(e) {
      e.preventDefault();
      setNotice(initialNoticeState);
      setNoticeImage(false);
      setImgData(null);
      $('#createForm input[type=file]').val('')
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNotice(notice => ({ ...notice, [name]: value }));
    }

    function handleCheckChange(e) {
      const { name, checked } = e.target;
      setNotice(notice => ({ ...notice, [name]: checked }));
  }

    function handleDescChange(value) {
      setNotice(notice => ({ ...notice, description: value }));
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

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        setinitialState(true);
        if (notice.title && notice.description) {
            dispatch(noticeActions.create(notice, noticeImage));   
            $('#createNotices').modal('toggle');
            $('.modal-backdrop').remove(); 
        }
    }

    return (

      <div className="modal fade" id="createNotices" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title" id="createNotices">Create New Notice</h5>
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
                          <CInput className={'form-control' + (submitted && !notice.title ? ' is-invalid' : '')} value={notice.title} id="title" name='title' onChange={handleChange} placeholder="Enter Notice's Title." />
                          {submitted && !notice.title &&
                                <div className="invalid-feedback">Title is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="12">
                      <CFormGroup>
                          <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
                          <ReactQuill name="description" value={notice.description} onChange={handleDescChange} className={'ql-custom' + (submitted && !notice.description ? ' is-invalid' : '')} modules={{ toolbar: toolbarOptions }}/>
                            {submitted && !notice.description &&
                                <div className="invalid-feedback">Description is required</div>
                            }
                          </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="image">Image</CLabel>
                          <CInput type="file" name="image"  onChange={handleImageChange} id="noticeImage"  />
                          {/* {submitted && !notice.image &&
                                <div className="invalid-feedback">Notice image is required</div>
                            } */}
                      </CFormGroup>
                      <div className="previewNoticeImage">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={notice.priority} name='priority'  onChange={handleChange} id="priority" placeholder="Enter notice's priority."  className={'form-control' + (submitted && !notice.priority ? ' is-invalid' : '')} />
                            {submitted && !notice.priority &&
                                <div className="invalid-feedback">Notice priority is required</div>
                            }
                        </CFormGroup>
                      </CCol>
                      <CCol md="3">
                        <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                            <CInputCheckbox
                                id="activeStatus"
                                name="active_status"
                                checked={notice.active_status}
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

export default CreateNotice ;
