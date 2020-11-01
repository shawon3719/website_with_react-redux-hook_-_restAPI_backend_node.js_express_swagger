/**
 * Fetch, update and create Sliders data from database using API.
 * Send data of specific id to edit page.
 * Handle delete method
 * React and JSX
 * @version React 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */
import React from 'react';
import {apiUrl} from '../../../../reusable/apiHost';
import CreateSlider from './CreateSlider';
// Scripts
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
} from '@coreui/react'

const token = localStorage.getItem('x-auth-token');

class Sliders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          sliders   : [],
          msg       : ''
        }
        this.fetchSliders = this.fetchSliders.bind(this);
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
    
    
    // ============= Get All the Sliders Group Data =================
    
    fetchSliders(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(apiUrl+"sliders/all", requestOptions)
        .then(response => response.text())
        .then((response) => {
            var obj = JSON.parse(response);
           if(obj.data != null){
            this.setState({
                sliders: obj.data
            })
           }else{
            this.props.history.push('/admin')
           }
        })
        .catch(error => console.log('error', error));
    }

    // ============= onLoad =================
    
      componentDidMount() {
        this.checkAuth() ?
         (this.fetchSliders())
        : this.props.history.push('/admin')
    }

    render() {
        const data = this.state.sliders;
        return (

    <div>
            <CCard>
                <CCardHeader className="bg-info">
                    All Sliders List
                    <CButton
                    className="btn btn-sm btn-success"
                    style={{float:"right", border:'.001em solid #22963c'}}
                    data-toggle="modal"
                    data-target="#createSliders"
                    >
                        <i style={{fontSize: '5px!important'}} className="fa fa-plus"></i><span> Add</span>
                    </CButton>
            
                </CCardHeader>
                <CCardBody>
                { 
                    data.length ? 
                        
                    <table id="example1" className="table table-striped table-bordered dataTable dtr-inline table-hover ">
                        
                        <thead>
                            <tr>
                            <th>SI</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>priority</th>
                            <th style={{width:"10%"}}>Action</th>
                            </tr>
                        </thead>

                        <tbody >
                            
                            {
                                this.state.sliders.map((slider,key) =>{
                                return(
                                    <tr>
                                        <td>{key+1}</td>
                                        <td>{slider.title}</td>
                                        <td>{slider.description}</td>
                                        <td><img src={slider.image}></img></td>
                                        <td>{slider.priority}</td>
                                        <td>
                                            <button 
                                                className='btn btn-info btn-xs'
                                                //   onClick={this.handleEditCat.bind(this,cat.categoryId)}
                                                //   data-toggle="modal" data-target="#editModal"
                                                >
                                                <i class="fa fa-pencil-square-o"></i>
                                            </button>

                                            <button 
                                                className='btn btn-danger btn-xs ml-1'
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
            <CreateSlider
                saveModalDetails={this.saveModalDetails}
            />
      </div>

        );
    }
}

export default Sliders;
