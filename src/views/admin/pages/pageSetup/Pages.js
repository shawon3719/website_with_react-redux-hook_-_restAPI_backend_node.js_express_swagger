/**
 * Fetch, update and create Page data from database using API.
 * Send data of specific id to edit page.
 * Handle delete method
 * React and JSX
 * @version React 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */
import React from 'react';
import {apiUrl} from '../../../../reusable/apiHost';
import CreatePage from './CreatePage';
import EditPage from './EditPage';
import $ from 'jquery'
// Scripts
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
} from '@coreui/react'
import { Link } from 'react-router-dom';

const token = localStorage.getItem('x-auth-token');

class Pages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          pages   : [],
          msg       : '',
          pageById: [],
        }
        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: true,
            show_pagination: true,
            filename: "restaurents",
            button: {
                excel: true,
                print: true,
                csv: true
            }
        }

        this.fetchPages = this.fetchPages.bind(this);
        this.handleEditPage = this.handleEditPage.bind(this);
    }

    // ================= Authentication check ==================
    
    checkAuth = () => {
        const token = localStorage.getItem('x-auth-token');
        if (!token) {
          return false;
        }else{
            return true;
        }
    }

    // ================= Get Page By ID ==================

    handleEditPage(id){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(apiUrl+"pages/page/"+id, requestOptions)
        .then(response => response.text())
        .then((response) => {
            var obj = JSON.parse(response);
           if(obj.data != null){
            this.setState({
                pageById: obj.data
            })
           }else{
            toast.warn(""+obj.message+"!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
              });
           }
        })
        .catch(error => console.log('error', error));

    }
    
    
    // ============= Get All the Pages Data =================
    
    fetchPages(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(apiUrl+"pages/all", requestOptions)
        .then(response => response.text())
        .then((response) => {
            var obj = JSON.parse(response);
           if(obj.data != null){
            this.setState({
                pages: obj.data
            })
            $('#myTable').DataTable();
           }else{
            this.props.history.push('/admin')
           }
        })
        .catch(error => console.log('error', error));
    }

    // ============= onLoad =================
    
      componentDidMount() {
        this.checkAuth() ?
         (this.fetchPages())
        : this.props.history.push('/admin')
    }

    render() {
        const data = this.state.pages;
        const ModalData = this.state.pageById;
        return (

    <div>
            <div className="db-breadcrumb">
                <h4 className="breadcrumb-title">Pages</h4>
                <ul className="db-breadcrumb-list">
                <li><Link to="/admin-index"><i className="fa fa-home" />Home</Link></li>
                <li>Pages</li>
                </ul>
            </div>	
            <CCard>
                <CCardHeader className="bg-info">
                    All Pages List
                    <CButton
                    className="btn btn-sm btn-success"
                    style={{float:"right", border:'.001em solid #22963c'}}
                    data-toggle="modal"
                    data-target="#createPages"
                    >
                        <i style={{fontSize: '5px!important'}} className="fa fa-plus"></i><span> Add</span>
                    </CButton>
            
                </CCardHeader>
                <CCardBody>
                { 
                    data.length ? 
                        
                    <table id="myTable" className="table table-striped table-bordered dataTable dtr-inline table-hover">
                        
                        <thead>
                            <tr>
                            <th>SI</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>priority</th>
                            <th style={{width:"11%"}}>Action</th>
                            </tr>
                        </thead>

                        <tbody >
                            
                            {
                                data.map((page,key) =>{
                                return(
                                    <tr>
                                        <td>{key+1}</td>
                                        <td>{page.title}</td>
                                        <td>{page.description}</td>
                                        <td><img src={page.image} width="100"/></td>
                                        <td>{page.priority}</td>
                                        <td>
                                            <button 
                                                className='btn btn-info btn-xs'
                                                  onClick={this.handleEditPage.bind(this,page.id)}
                                                  data-toggle="modal" data-target="#editModal"
                                                >
                                                <i class="fa fa-pencil-square-o"></i>
                                            </button>

                                            <button 
                                                className='btn btn-danger btn-xs ml-1'
                                                // onClick={() => props.deletePage(this,page.id)}
                                                //  onClick={this.showconfDelAlert.bind(this,cat.categoryId)}
                                                >
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                                })
                            }
                            
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>SI</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>priority</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
                    
                : 
                    <div>
                        {/* <div class="img-container loading">
                            <img src={logo} class="blank"/>
                        </div> */}
                        <p>Loading..</p>
                    
                    </div>
                }
                
                </CCardBody>
            </CCard>
            <CreatePage
                saveModalDetails={this.saveModalDetails}
            />
             <EditPage
                title = {ModalData.title}
                description = {ModalData.description}
                created_by = {ModalData.created_by}
                priority = {ModalData.priority}
            />
      </div>

        );
    }
}

export default Pages;
