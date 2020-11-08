// /**
//  * Fetch, update and create Sliders data from database using API.
//  * Send data of specific id to edit page.
//  * Handle delete method
//  * React and JSX
//  * @version React 16.5.2
//  * @author [Masudul Hasan Shawon](masudul@atilimited.net)
//  * 
//  */
// import React from 'react';
// import {apiUrl} from '../../../../reusable/apiHost';
// import CreateSlider from './CreateSlider';
// import EditSlider from './EditSlider';
// import $ from 'jquery'
// // Scripts
// import 'jquery/dist/jquery.min.js';
// import 'popper.js/dist/popper.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';
// // Styles
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css";
// import {
//   CBadge,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CDataTable,
//   CButton,
// } from '@coreui/react'
// import { Link } from 'react-router-dom';

// const token = localStorage.getItem('x-auth-token');

// class Sliders extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//           sliders   : [],
//           msg       : '',
//           sliderById: [],
//         }
//         this.config = {
//             page_size: 10,
//             length_menu: [10, 20, 50],
//             show_filter: true,
//             show_pagination: true,
//             filename: "restaurents",
//             button: {
//                 excel: true,
//                 print: true,
//                 csv: true
//             }
//         }

//         this.fetchSliders = this.fetchSliders.bind(this);
//         this.handleEditSlider = this.handleEditSlider.bind(this);
//     }

//     // ================= Authentication check ==================
    
//     checkAuth = () => {
//         const token = localStorage.getItem('x-auth-token');
//         if (!token) {
//           return false;
//         }else{
//             return true;
//         }
//     }

//     // ================= Get Slider By ID ==================

//     handleEditSlider(id){
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", "Bearer "+token);

//         var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//         };

//         fetch(apiUrl+"sliders/slider/"+id, requestOptions)
//         .then(response => response.text())
//         .then((response) => {
//             var obj = JSON.parse(response);
//            if(obj.data != null){
//             this.setState({
//                 sliderById: obj.data
//             })
//            }else{
//             toast.warn(""+obj.message+"!",{
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true
//               });
//            }
//         })
//         .catch(error => console.log('error', error));

//     }
    
    
//     // ============= Get All the Sliders Data =================
    
//     fetchSliders(){
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", "Bearer "+token);

//         var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//         };

//         fetch(apiUrl+"sliders/all", requestOptions)
//         .then(response => response.text())
//         .then((response) => {
//             var obj = JSON.parse(response);
//            if(obj.data != null){
//             this.setState({
//                 sliders: obj.data
//             })
//             $('#myTable').DataTable();
//            }else{
//             this.props.history.push('/admin')
//            }
//         })
//         .catch(error => console.log('error', error));
//     }

//     // ============= onLoad =================
    
//       componentDidMount() {
//         this.checkAuth() ?
//          (this.fetchSliders())
//         : this.props.history.push('/admin')
//     }

//     render() {
//         const data = this.state.sliders;
//         const ModalData = this.state.sliderById;
//         return (

//     <div>
//             <div className="db-breadcrumb">
//                 <h4 className="breadcrumb-title">Sliders</h4>
//                 <ul className="db-breadcrumb-list">
//                 <li><Link to="/admin-index"><i className="fa fa-home" />Home</Link></li>
//                 <li>Sliders</li>
//                 </ul>
//             </div>	
//             <CCard>
//                 <CCardHeader className="bg-info">
//                     All Sliders List
//                     <CButton
//                     className="btn btn-sm btn-success"
//                     style={{float:"right", border:'.001em solid #22963c'}}
//                     data-toggle="modal"
//                     data-target="#createSliders"
//                     >
//                         <i style={{fontSize: '5px!important'}} className="fa fa-plus"></i><span> Add</span>
//                     </CButton>
            
//                 </CCardHeader>
//                 <CCardBody>
//                 { 
//                     data.length ? 
                        
//                     <table id="myTable" className="table table-striped table-bordered dataTable dtr-inline table-hover">
                        
//                         <thead>
//                             <tr>
//                             <th>SI</th>
//                             <th>Title</th>
//                             <th>Description</th>
//                             <th>Image</th>
//                             <th>priority</th>
//                             <th style={{width:"11%"}}>Action</th>
//                             </tr>
//                         </thead>

//                         <tbody >
                            
//                             {
//                                 data.map((slider,key) =>{
//                                 return(
//                                     <tr>
//                                         <td>{key+1}</td>
//                                         <td>{slider.title}</td>
//                                         <td>{slider.description}</td>
//                                         <td><img src={slider.image} width="100"/></td>
//                                         <td>{slider.priority}</td>
//                                         <td>
//                                             <button 
//                                                 className='btn btn-info btn-xs'
//                                                   onClick={this.handleEditSlider.bind(this,slider.id)}
//                                                   data-toggle="modal" data-target="#editModal"
//                                                 >
//                                                 <i class="fa fa-pencil-square-o"></i>
//                                             </button>

//                                             <button 
//                                                 className='btn btn-danger btn-xs ml-1'
//                                                 // onClick={() => props.deleteSlider(this,slider.id)}
//                                                 //  onClick={this.showconfDelAlert.bind(this,cat.categoryId)}
//                                                 >
//                                                 <i class="fa fa-trash"></i>
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 )
//                                 })
//                             }
                            
//                         </tbody>
//                         <tfoot>
//                             <tr>
//                                 <th>SI</th>
//                                 <th>Title</th>
//                                 <th>Description</th>
//                                 <th>Image</th>
//                                 <th>priority</th>
//                                 <th>Action</th>
//                             </tr>
//                         </tfoot>
//                     </table>
                    
//                 : 
//                     <div>
//                         {/* <div class="img-container loading">
//                             <img src={logo} class="blank"/>
//                         </div> */}
//                         <p>Loading..</p>
                    
//                     </div>
//                 }
                
//                 </CCardBody>
//             </CCard>
//             <CreateSlider
//                 saveModalDetails={this.saveModalDetails}
//             />
//              <EditSlider
//                 title = {ModalData.title}
//                 description = {ModalData.description}
//                 created_by = {ModalData.created_by}
//                 priority = {ModalData.priority}
//             />
//       </div>

//         );
//     }
// }

// export default Sliders;


import React, { useState, useEffect } from "react";
import SliderDataService from "../../../../_services/SliderService";
import { Link } from "react-router-dom";
import CreateSlider from './CreateSlider';
import EditSlider from './EditSlider';
import $ from 'jquery'
// Scripts
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
} from '@coreui/react'

const SlidersList = () => {
  const [sliders, setSliders] = useState([]);
  const [currentSlider, setCurrentSlider] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveSliders();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveSliders = () => {
    SliderDataService.getAll()
      .then(response => {
        console.log(response.data.data);
        setSliders(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveSliders();
    setCurrentSlider(null);
    setCurrentIndex(-1);
  };

  const setActiveSlider = (slider, index) => {
    setCurrentSlider(slider);
    setCurrentIndex(index);
  };

  const removeAllSliders = () => {
    SliderDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    SliderDataService.findByTitle(searchTitle)
      .then(response => {
        setSliders(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteSlider = (id) => {
    SliderDataService.remove(id)
      .then(response => {
        toast.success("✓ "+response.data.message+"!",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
       <div>
       <ToastContainer />
            <div className="db-breadcrumb">
                 <h4 className="breadcrumb-title">Sliders</h4>
                 <ul className="db-breadcrumb-list">
                 <li><Link to="/admin-index"><i className="fa fa-home" />Home</Link></li>
                 <li>Sliders</li>
                 </ul>
             </div>	             <CCard>                 <CCardHeader className="bg-info">
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
                                sliders &&
            sliders.map((slider, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{slider.title}</td>
                                        <td>{slider.description}</td>
                                        <td><img src={slider.image} width="100"/></td>
                                        <td>{slider.priority}</td>
                                        <td>
                                            <button 
                                                className='btn btn-info btn-xs'
                                                onClick={() => setActiveSlider(slider, slider.id)}
                                                data-toggle="modal" data-target="#editModal"
                                                >
                                                <i class="fa fa-pencil-square-o"></i>
                                            </button>

                                            <button 
                                                className='btn btn-danger btn-xs ml-1'
                                                onClick={() => deleteSlider(slider.id)}
                                                //  onClick={this.showconfDelAlert.bind(this,cat.categoryId)}
                                                >
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                            
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
                    

                
                </CCardBody>
            </CCard>
            <CreateSlider
                // saveModalDetails={this.saveModalDetails}
            />
             {currentSlider ? (
             <EditSlider
                id = {currentSlider.id}
                title = {currentSlider.title}
                description = {currentSlider.description}
                created_by = {currentSlider.created_by}
                priority = {currentSlider.priority}
            />
              ) : (
          <div>
          </div>
        )}
      </div>

  );
};

export default SlidersList;
