
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
  CSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import CalendarDataService from "../../../../_services/combined.service";
import { calendarActions } from '../../../../_actions/calendar.action';

const EditCalendar = props => {
  const user = useSelector(state => state.authentication.user);
  const initialCalendarState = {
    id                : props,
    title             : '',
    active_status     : '',
    calendar_file     : '',
    priority          : '',
    updted_by         : user.firstName+' '+user.lastName
  };
  const [currentCalendar, setCurrentCalendar] = useState(initialCalendarState);
  const [calendarImage, setCalendarImage] = useState("");
  const [imgData, setImgData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getCalendar(props.id)
  }, [props.id]);

  const getCalendar = id => {
    CalendarDataService.getCalendar(id)
      .then(response => {
        setCurrentCalendar(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });  
  };


  const handleEditChange = event => {
    const { name, value } = event.target;
    setCurrentCalendar({ ...currentCalendar, [name]: value, updated_by  : user.firstName+' '+user.lastName });
  };

  function handleEditCheckChange(e) {
    const { checked } = e.target;
    setCurrentCalendar(currentCalendar => ({ ...currentCalendar, active_status: checked, updated_by  : user.firstName+' '+user.lastName }));
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
    setCurrentCalendar({ ...currentCalendar, updated_by  : user.firstName+' '+user.lastName });
  };

  const updateCalendar = () => {
    setSubmitted(true);
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
                          <CLabel htmlFor="title">Title <span className="requiredText">*</span></CLabel>
                          <CInput className={'form-control' + (submitted && !currentCalendar.title ? ' is-invalid' : '')} value={currentCalendar.title} id="title" name='title' onChange={handleEditChange} placeholder="Enter Calendar's Title." />
                          {submitted && !currentCalendar.title &&
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
                    </CCol>
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                            <CInput type="number" value={currentCalendar.priority} name='priority' onChange={handleEditChange} id="priority" placeholder="Enter calendar's priority"  className={'form-control' + (submitted && !currentCalendar.priority ? ' is-invalid' : '')} />
                        </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup row>
                        <CCol style={{ color: currentCalendar.active_status == 1? 'green': 'red'}} tag="label" sm="12" className="col-form-label">
                          {currentCalendar.active_status == 1? " Active" : " Inactive"}
                        </CCol>
                        <CCol sm="12">
                          <CSwitch
                            className="mr-1"
                            color = {currentCalendar.active_status == 1? "success" : "danger"}
                            checked = {currentCalendar.active_status == 1? true : false}
                            onChange={handleEditCheckChange}
                            shape="pill"
                            variant="outline"
                          />
                        </CCol>
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
        <div className="pt-3 text-center">
          <span className="spinner-border spinner-border-sm mr-1"></span>
        </div>
      )}
    </div>
  );
};

export default EditCalendar;