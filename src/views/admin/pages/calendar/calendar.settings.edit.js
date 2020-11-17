
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CInputCheckbox,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
// import CalendarDataService from "../../../../_services/CalendarService";
import { calendarActions } from '../../../../_actions/calendar.action';

const EditCalendar = props => {
  const user = useSelector(state => state.authentication.user);
  const getCalendarByID = useSelector(state => state.calendars.currentCalendar)
  const initialCalendarState = {
    id: props,
    calendarName        : '',
    title             : '',
    email             : '',
    calendar_url        : '',
    phone_no          : '',
    mobile            : '',
    address           : '',
    active_status     : true,
    priority          : '',
    created_by        : user.firstName+' '+user.lastName
  };
  const [currentCalendar, setCurrentCalendar] = useState(initialCalendarState);
  const [calendarImage, setCalendarImage] = useState("");
  const [imgData, setImgData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calendarActions.getById(props.id));
   console.log(getCalendarByID)
  }, [props.id]);

  const handleChange = event => {
    const { name, value } = event.target;
    setCurrentCalendar({ ...currentCalendar, [name]: value });
  };

  function handleCheckChange(e) {
    const { name, checked } = e.target;
    setCurrentCalendar(currentCalendar => ({ ...currentCalendar, [name]: checked }));
  }

  function handleDescChange (value){
    setCurrentCalendar({ ...currentCalendar, description: value });
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

  const updateCalendar = () => {
    // setSubmitted(true);
    if (currentCalendar.title && currentCalendar.priority) {
        dispatch(calendarActions.update(currentCalendar, calendarImage));
        $('#editModal').modal('toggle');
        $('.modal-backdrop').remove();   
    }
  };
  return (
    <div>
      {currentCalendar ? (
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title" id="editModal">Update This Calendar</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CForm >
                <CFormGroup row>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="calendarName">Calendar Name <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !currentCalendar.calendarName ? ' is-invalid' : '')} value={currentCalendar.calendarName} id="calendarName" name='calendarName' onChange={handleChange} placeholder="Enter Calendar's Name." />
                          {submitted && !currentCalendar.calendarName &&
                                <div className="invalid-feedback">Calendar Name is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="title">Title <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !currentCalendar.title ? ' is-invalid' : '')} value={currentCalendar.title} id="title" name='title' onChange={handleChange} placeholder="Enter Calendar's Title." />
                          {submitted && !currentCalendar.title &&
                                <div className="invalid-feedback">Title is required</div>
                            }
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="description">email <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !currentCalendar.email ? ' is-invalid' : '')} value={currentCalendar.email} id="email" name='email' onChange={handleChange} placeholder="Enter Calendar's Email." />
                          {submitted && !currentCalendar.email &&
                                <div className="invalid-feedback">Description is required</div>
                            }
                          </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                          <CLabel htmlFor="calendar_logo">Calendar Logo</CLabel>
                          <CInput type="file" name="calendar_logo"  onChange={handleImageChange} id="calendarLogo"  />
                          {/* {submitted && !calendar.image &&
                                <div className="invalid-feedback">Calendar logo is required</div>
                            } */}
                      </CFormGroup>
                      <div className="previewCalendarLogo">
                              <img width="80" src={imgData} />
                      </div>
                    </CCol>
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel htmlFor="phone_no">Phone Number <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={currentCalendar.phone_no} name='phone_no'  onChange={handleChange} id="phone_no" placeholder="Enter calendar's phone no."  className={'form-control' + (submitted && !currentCalendar.phone_no ? ' is-invalid' : '')} />
                            {submitted && !currentCalendar.phone_no &&
                                <div className="invalid-feedback">Calendar phone no. is required</div>
                            }
                        </CFormGroup>
                    </CCol>
                    <CCol md="6">
                    <CFormGroup>
                        <CLabel htmlFor="mobile">Mobile <span className="requiredText">*</span></CLabel>
                        <CInput type="number" value={currentCalendar.mobile} name='mobile'  onChange={handleChange} id="mobile" placeholder="Enter calendar's mobile"  className={'form-control' + (submitted && !currentCalendar.mobile ? ' is-invalid' : '')} />
                        {submitted && !currentCalendar.mobile &&
                            <div className="invalid-feedback">Calendar mobile is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                    <CCol md="6">
                    <CFormGroup>
                        <CLabel htmlFor="calendar_url">Calendar URL <span className="requiredText">*</span></CLabel>
                        <CInput type="text" value={currentCalendar.calendar_url} name='calendar_url'  onChange={handleChange} id="calendar_url" placeholder="Enter calendar's url"  className={'form-control' + (submitted && !currentCalendar.calendar_url ? ' is-invalid' : '')} />
                        {submitted && !currentCalendar.calendar_url &&
                            <div className="invalid-feedback">Calendar url is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={currentCalendar.priority} name='priority' onChange={handleChange} id="priority" placeholder="Enter calendar's priority"  className={'form-control' + (submitted && !currentCalendar.priority ? ' is-invalid' : '')} />
                        </CFormGroup>
                    </CCol>
                    <CCol md="3">
                        <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                            <CInputCheckbox
                                id="activeStatus"
                                name="active_status"
                                checked={currentCalendar.active_status}
                                onChange={handleCheckChange}
                                custom
                            />
                            <CLabel variant="custom-checkbox" htmlFor="activeStatus">
                            Active
                            </CLabel>
                        </CFormGroup>
                    </CCol>
                    <CCol md="12">
                    <CFormGroup>
                        <CLabel htmlFor="address">Address <span className="requiredText">*</span></CLabel>
                        <CInput type="text" value={currentCalendar.address} name='address'  onChange={handleChange} id="address" placeholder="Enter calendar's address"  className={'form-control' + (submitted && !currentCalendar.address ? ' is-invalid' : '')} />
                        {submitted && !currentCalendar.address &&
                            <div className="invalid-feedback">Calendar address is required</div>
                        }
                    </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <div style={{textAlign: 'center'}}>
                    <CButton onClick={updateCalendar} size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
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
          {
            setCurrentCalendar(getCalendarByID)}
        </div>
      )}
    </div>
  );
};

export default EditCalendar;