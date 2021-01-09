import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calendarActions } from '../../../../_actions/calendar.action';
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

function CreateCalendar() {
    const user = useSelector(state => state.authentication.user);
    const initialCalendarState = {
      title             : '',
      active_status     : true,
      priority          : '',
      created_by        : user.firstName+' '+user.lastName
    };
    const [calendar, setCalendar] = useState(initialCalendarState);
    const [active_status, setActive] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [state, setinitialState] = useState(false);
    const submitting = useSelector(state => state.calendars.loading);
    const [calendarImage, setCalendarImage] = useState(null);
    const [imgData, setImgData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
      setSubmitted(false);
    }, [state]);


    function resetForm(e) {
      e.preventDefault();
      setCalendar(initialCalendarState);
      setCalendarImage(false);
      setImgData(null);
      $('#createForm input[type=file]').val('')
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setCalendar(calendar => ({ ...calendar, [name]: value }));
    }

    function handleCheckChange(e) {
        const { name, checked } = e.target;
      setCalendar(calendar => ({ ...calendar, [name]: checked }));
    }

    const handleImageChange = e => {
      if (e.target.files[0]) {
          setCalendarImage(e.target.files[0]);
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
        if (calendar.title && calendar.priority) {
            dispatch(calendarActions.create(calendar, calendarImage));   
            $('#createCalendars').modal('toggle');
            $('.modal-backdrop').remove(); 
        }
    }

    return (

      <div className="modal fade" id="createCalendars" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title" id="createCalendars">Create New Calendar</h5>
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
                          <CInput className={'form-control' + (submitted && !calendar.title ? ' is-invalid' : '')} value={calendar.title} id="title" name='title' onChange={handleChange} placeholder="Enter Calendar's Title." />
                          {submitted && !calendar.title &&
                                <div className="invalid-feedback">Title is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="calendar_file">Calendar File</CLabel>
                          <CInput type="file" name="calendar_file"  onChange={handleImageChange} id="calendarFile" accept="application/pdf" />
                          {/* {submitted && !calendar.image &&
                                <div className="invalid-feedback">Calendar logo is required</div>
                            } */}
                      </CFormGroup>
                      <div className="previewCalendarFile">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={calendar.priority} name='priority' onChange={handleChange} id="priority" placeholder="Enter calendar's priority"  className={'form-control' + (submitted && !calendar.priority ? ' is-invalid' : '')} />
                        </CFormGroup>
                    </CCol>
                    <CCol md="6">
                        <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                            <CInputCheckbox
                                id="activeStatus"
                                name="active_status"
                                checked={calendar.active_status}
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

export default CreateCalendar ;
