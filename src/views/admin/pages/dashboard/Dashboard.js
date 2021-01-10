import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { systemActions, employeeActions, noticeActions } from 'src/_actions';
import { authentication } from 'src/_reducers/authentication.reducer';
import Moment from 'moment';
import { customUrl } from "src/reusable/apiHost";

function HomePage() {
    // const users = useSelector(state => state.users);
    // const user = useSelector(state => state.authentication.user);
    // const loginStatus = useSelector((action) => action.type);
    const employees = useSelector(state => state.employees);
    const notices = useSelector(state => state.notices);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.authentication.loggedIn);

    useEffect(() => {
      const loginStatus = localStorage.getItem('login-message')
      if(loginStatus){
      toast.success("Login successfull!");
      localStorage.removeItem('login-message')
      }
      if(!isLoggedIn){
        window.location.href = '/#/admin'
      }else{
        dispatch(employeeActions.getAll());
        dispatch(noticeActions.getAll());
      }
    }, []);
    return (
                  
  <div className="container-fluid">
  <ToastContainer/>
  <div className="db-breadcrumb">
    <h4 className="breadcrumb-title">Dashboard</h4>
    <ul className="db-breadcrumb-list">
      <li><Link to="/admin-index"><i className="fa fa-home" />Home</Link></li>
      <li>Dashboard</li>
    </ul>
  </div>	
  {/* Card */}
  <div className="row">
    <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
      <div className="widget-card widget-bg1">					 
        <div className="wc-item">
          <h4 className="wc-title">
            Total Students
          </h4>
          <span className="wc-des">
            All Course
          </span>
          <span className="wc-stats">
            <span className="counter">18</span>
          </span>		
          <div className="progress wc-progress">
            <div className="progress-bar" role="progressbar" style={{width: '78%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
          </div>
          <span className="wc-progress-bx">
            <span className="wc-change">
              Change
            </span>
            <span className="wc-number ml-auto">
              78%
            </span>
          </span>
        </div>				      
      </div>
    </div>
    <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
      <div className="widget-card widget-bg2">					 
        <div className="wc-item">
          <h4 className="wc-title">
            Total Employees
          </h4>
          <span className="wc-des">
            All Category
          </span>
          <span className="wc-stats counter">
            {employees.items && employees.items.length}
          </span>		
          <div className="progress wc-progress">
            <div className="progress-bar" role="progressbar" style={{width: '88%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
          </div>
          <span className="wc-progress-bx">
            <span className="wc-change">
              Change
            </span>
            <span className="wc-number ml-auto">
              88%
            </span>
          </span>
        </div>				      
      </div>
    </div>
    <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
      <div className="widget-card widget-bg3">					 
        <div className="wc-item">
          <h4 className="wc-title">
            New Messages
          </h4>
          <span className="wc-des">
            Messages Per Day
          </span>
          <span className="wc-stats counter">
            7
          </span>		
          <div className="progress wc-progress">
            <div className="progress-bar" role="progressbar" style={{width: '65%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
          </div>
          <span className="wc-progress-bx">
            <span className="wc-change">
              Change
            </span>
            <span className="wc-number ml-auto">
              65%
            </span>
          </span>
        </div>				      
      </div>
    </div>
    <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
      <div className="widget-card widget-bg4">					 
        <div className="wc-item">
          <h4 className="wc-title">
            New Subscribers
          </h4>
          <span className="wc-des">
            On our site right now
          </span>
          <span className="wc-stats counter">
            350 
          </span>		
          <div className="progress wc-progress">
            <div className="progress-bar" role="progressbar" style={{width: '90%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
          </div>
          <span className="wc-progress-bx">
            <span className="wc-change">
              Change
            </span>
            <span className="wc-number ml-auto">
              90%
            </span>
          </span>
        </div>				      
      </div>
    </div>
  </div>
  {/* Card END */}
  <div className="row">
    {/* Latest Employee */}
    {
            employees.items ?
    <div className="col-lg-8 m-b30">
      <div className="widget-box">
        <div className="wc-title">
          <h4>Latest Employees</h4>
        </div>
        <div className="widget-inner">
          <div className="new-user-list">
            <ul>
            {
                      employees.items &&
                      employees.items.sort((a, b) => a.joining_date > b.joining_date ? 1:-1).map((employee, index) => (
              <li>
                <span className="new-users-pic">
                  <img src={customUrl+employee.profile_photo} alt={employee.full_name} />
                </span>
                <span className="new-users-text">
                  <a href="#" className="new-users-name">{employee.full_name}</a>
                  <span className="new-users-info">{employee.designation}</span>
                </span>
                <span className="new-users-btn">
                  <Link to="/all-employee" className="btn button-sm outline">View More</Link>
                </span>
              </li>
                      )).reverse().slice(0, 3)}
              </ul>
          </div>
        </div>
      </div>
    </div>
    :
    <span className="spinner-border spinner-border-sm mr-1"></span>
    }
    
    {/* Latest Notice*/}
    <div className="col-lg-4 m-b30">
      <div className="widget-box">
        <div className="wc-title">
          <h4>Latest Notice</h4>
        </div>
        <div className="widget-inner">
          <div className="orders-list">
            <ul>
            {
                      notices.items &&
                      notices.items.sort((a, b) => a.created_at > b.created_at ? 1:-1).map((notice, index) => (
              
              <li>
                <span className="orders-title">
                  <a href="#" className="orders-title-name">{notice.title}</a>
                  <span className="orders-info">Notice #{notice.id} | Published - { Moment(notice.created_at).fromNow()}</span>
                </span>
                <span className="orders-btn">
                  <a href="#" className={notice.active_status == 1 ? 'btn button-sm green' : 'btn button-sm red'}>{notice.active_status == 1 ? 'Active' : 'Inactive'}</a>
                </span>
              </li>
              )).reverse().slice(0, 2)}
              </ul>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</div>
);
}

export { HomePage };












// import React from 'react';
// import { Link } from 'react-router-dom';

// class Dashboard extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       user: []
//     }
    
//   }
  
// // ================= Authentication check ==================
//  checkAuth = () => {
//     const token = localStorage.getItem('x-auth-token');
//     if (!token) {
//       return false;
//     }else{
//         return true;
//     }
//   }
//     componentDidMount() {
//       this.checkAuth() ?
//       ( 
//         this.state = {isLoggedIn: true}
//       )

//      : this.props.history.push(`/admin`)
//   }
//     render() {
//         return (
          
//   <div className="container-fluid">
//       <div className="db-breadcrumb">
//         <h4 className="breadcrumb-title">Dashboard</h4>
//         <ul className="db-breadcrumb-list">
//           <li><Link to="/admin-index"><i className="fa fa-home" />Home</Link></li>
//           <li>Dashboard</li>
//         </ul>
//       </div>	
//       {/* Card */}
//       <div className="row">
//         <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
//           <div className="widget-card widget-bg1">					 
//             <div className="wc-item">
//               <h4 className="wc-title">
//                 Total Students
//               </h4>
//               <span className="wc-des">
//                 All Course
//               </span>
//               <span className="wc-stats">
//                 <span className="counter">18</span>
//               </span>		
//               <div className="progress wc-progress">
//                 <div className="progress-bar" role="progressbar" style={{width: '78%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
//               </div>
//               <span className="wc-progress-bx">
//                 <span className="wc-change">
//                   Change
//                 </span>
//                 <span className="wc-number ml-auto">
//                   78%
//                 </span>
//               </span>
//             </div>				      
//           </div>
//         </div>
//         <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
//           <div className="widget-card widget-bg2">					 
//             <div className="wc-item">
//               <h4 className="wc-title">
//                 Total Employees
//               </h4>
//               <span className="wc-des">
//                 All Category
//               </span>
//               <span className="wc-stats counter">
//                 120 
//               </span>		
//               <div className="progress wc-progress">
//                 <div className="progress-bar" role="progressbar" style={{width: '88%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
//               </div>
//               <span className="wc-progress-bx">
//                 <span className="wc-change">
//                   Change
//                 </span>
//                 <span className="wc-number ml-auto">
//                   88%
//                 </span>
//               </span>
//             </div>				      
//           </div>
//         </div>
//         <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
//           <div className="widget-card widget-bg3">					 
//             <div className="wc-item">
//               <h4 className="wc-title">
//                 New Messages
//               </h4>
//               <span className="wc-des">
//                 Messages Per Day
//               </span>
//               <span className="wc-stats counter">
//                 7
//               </span>		
//               <div className="progress wc-progress">
//                 <div className="progress-bar" role="progressbar" style={{width: '65%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
//               </div>
//               <span className="wc-progress-bx">
//                 <span className="wc-change">
//                   Change
//                 </span>
//                 <span className="wc-number ml-auto">
//                   65%
//                 </span>
//               </span>
//             </div>				      
//           </div>
//         </div>
//         <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
//           <div className="widget-card widget-bg4">					 
//             <div className="wc-item">
//               <h4 className="wc-title">
//                 New Subscribers
//               </h4>
//               <span className="wc-des">
//                 On our site right now
//               </span>
//               <span className="wc-stats counter">
//                 350 
//               </span>		
//               <div className="progress wc-progress">
//                 <div className="progress-bar" role="progressbar" style={{width: '90%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
//               </div>
//               <span className="wc-progress-bx">
//                 <span className="wc-change">
//                   Change
//                 </span>
//                 <span className="wc-number ml-auto">
//                   90%
//                 </span>
//               </span>
//             </div>				      
//           </div>
//         </div>
//       </div>
//       {/* Card END */}
//       <div className="row">
//         {/* Latest Employee */}
//         <div className="col-lg-8 m-b30">
//           <div className="widget-box">
//             <div className="wc-title">
//               <h4>Latest Employees</h4>
//             </div>
//             <div className="widget-inner">
//               <div className="new-user-list">
//                 <ul>
//                   <li>
//                     <span className="new-users-pic">
//                       <img src="assets/images/testimonials/pic1.jpg" alt />
//                     </span>
//                     <span className="new-users-text">
//                       <a href="#" className="new-users-name">Mr. Abdul Kadir </a>
//                       <span className="new-users-info">Visual Designer,Google Inc </span>
//                     </span>
//                     <span className="new-users-btn">
//                       <a href="#" className="btn button-sm outline">View More</a>
//                     </span>
//                   </li>
//                   <li>
//                     <span className="new-users-pic">
//                       <img src="assets/images/testimonials/pic2.jpg" alt />
//                     </span>
//                     <span className="new-users-text">
//                       <a href="#" className="new-users-name"> Milano Esco </a>
//                       <span className="new-users-info">Product Designer, Apple Inc </span>
//                     </span>
//                     <span className="new-users-btn">
//                       <a href="#" className="btn button-sm outline">View More</a>
//                     </span>
//                   </li>
//                   <li>
//                     <span className="new-users-pic">
//                       <img src="assets/images/testimonials/pic1.jpg" alt />
//                     </span>
//                     <span className="new-users-text">
//                       <a href="#" className="new-users-name">Nick Bold</a>
//                       <span className="new-users-info">Web Developer, Facebook Inc </span>
//                     </span>
//                     <span className="new-users-btn">
//                       <a href="#" className="btn button-sm outline">View More</a>
//                     </span>
//                   </li>
//                  </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Latest Notice*/}
//         <div className="col-lg-4 m-b30">
//           <div className="widget-box">
//             <div className="wc-title">
//               <h4>Latest Notice</h4>
//             </div>
//             <div className="widget-inner">
//               <div className="orders-list">
//                 <ul>
//                   <li>
//                     <span className="orders-title">
//                       <a href="#" className="orders-title-name">BSC. Admission </a>
//                       <span className="orders-info">Notice #02357 | Date 12/08/2019</span>
//                     </span>
//                     <span className="orders-btn">
//                       <a href="#" className="btn button-sm red">Inactive</a>
//                     </span>
//                   </li>
//                   <li>
//                     <span className="orders-title">
//                       <a href="#" className="orders-title-name">Diploma Mid-term Exam</a>
//                       <span className="orders-info">Notice #02357 | Date 12/08/2019</span>
//                     </span>
//                     <span className="orders-btn">
//                       <a href="#" className="btn button-sm red">Inactive</a>
//                     </span>
//                   </li>
//                   <li>
//                     <span className="orders-title">
//                       <a href="#" className="orders-title-name">Assistant Teacher Circular </a>
//                       <span className="orders-info">Notice #02357 | Date 12/08/2019</span>
//                     </span>
//                     <span className="orders-btn">
//                       <a href="#" className="btn button-sm green">Active</a>
//                     </span>
//                   </li>
//                  </ul>
//               </div>
//             </div>
//           </div>
//         </div>
        
//       </div>
//   </div>


//         );
//     }
// }

// export default Dashboard;