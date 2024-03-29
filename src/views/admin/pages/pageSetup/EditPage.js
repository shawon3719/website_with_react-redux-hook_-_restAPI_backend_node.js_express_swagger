import React, { Component } from 'react';
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
  import $ from 'jquery';

class editPage extends Component {
    constructor(props) 
    {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.state = 
        {
            id              : '',
            title           : '',
            description     : '',
            image           : '',
            created_by      : localStorage.getItem('profile_name'),
            priority        : '',
            active_status   : '',
            pages           : [],
            errors          : 
                            {
                                title: '',
                                description: '',
                                priority    : '',
                                image: ''
                            }
        }
    }
    handleImageChange(e){
        e.preventDefault();
        this.setState({image: e.target.files[0]})
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
          case 'title': 
            errors.title = 
              value.length < 1
                ? 'is-invalid'
                : 'is-valid';
            break;
          case 'description': 
            errors.description = 
            value.length < 1
              ? 'is-invalid'
              : 'is-valid';
          break;
          case 'priority': 
            errors.priority = 
            value.length < 1
              ? 'is-invalid'
              : 'is-valid';
          break;
          case 'image': 
          errors.image = 
          value.length < 1
            ? 'is-invalid'
            : 'is-valid';
        break;
        default:
        break;
        }
    
        this.setState(
            {
                errors, [name]: value,
                [event.target.name]: event.target.value
            });
      }


      componentWillReceiveProps(nextProps) {
        this.setState({
            id              : nextProps.id,
            title           : nextProps.title,
            description     : nextProps.description,
            created_by      : nextProps.created_by,
            priority        : nextProps.priority,
            active_status   : nextProps.active_status
        });
    }



    onSubmit(e){
        e.preventDefault();
        const token = localStorage.getItem('x-auth-token');

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

        var formdata = new FormData();
        formdata.append("id", this.state.id);
        formdata.append("title", this.state.title);
        formdata.append("description", this.state.description);
        formdata.append("image", this.state.image, this.state.image.name);
        formdata.append("priority", this.state.priority);
        formdata.append("active_status",this.state.active_status == true ? 1 : 0);
        formdata.append("updated_by", this.state.updated_by);

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        fetch(apiUrl+"pages/update", requestOptions)
        .then(response => response.text())
        .then((response) => {
                var obj = JSON.parse(response);
                toast.success("✓ "+obj.message+"!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
                });
            })
        .catch(error => console.log('error', error));
    }
    
    render() {
        const {errors} = this.state;
        return (
            <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title" id="editModal">Create New Base Link</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <CForm noValidate onSubmit={this.onSubmit}>
                                <CFormGroup row>
                                    <CCol md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="title">Title <span className="requiredText">*</span></CLabel>
                                            <CInput value={this.state.title} className={errors.title} id="title" name='title' onChange={this.handleChange} placeholder="Enter page's Title." />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="description">Description <span className="requiredText">*</span></CLabel>
                                            <CInput value={this.state.description} type="text" className={errors.description} name='description' onChange={this.handleChange} id="description" placeholder="Enter page's description." />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="image">Image</CLabel>
                                            <CInput type="file" className={errors.image} onChange={this.handleImageChange} id="image"  />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="3">
                                        <CFormGroup>
                                            <CLabel htmlFor="priority">Priority <span className="requiredText">*</span></CLabel>
                                            <CInput type="number" value={this.state.priority} className={errors.priority} name='priority' onChange={this.handleChange} id="priority" placeholder="Enter page's priority." />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="3">
                                        <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                                            <CInputCheckbox
                                                id="updActiveStatus"
                                                name="active_status"
                                                checked={this.state.active_status}
                                                onChange={e=> {  this.setState({
                                                                    [e.target.name]: e.target.checked
                                                                })
                                                            }
                                                        }
                                                custom
                                            />
                                            <CLabel variant="custom-checkbox" htmlFor="updActiveStatus">
                                            Active
                                            </CLabel>
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                                <div style={{textAlign: 'center'}}>
                                    <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
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
        );
    }
}

export default editPage;