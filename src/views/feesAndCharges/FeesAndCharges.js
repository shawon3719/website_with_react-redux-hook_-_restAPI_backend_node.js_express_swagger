/**
 * Philosophy page
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Route , withRouter} from 'react-router-dom';


class AdmissionProcedure extends Component {

// ============= onLoad =================
componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  render(){
    return(
        <div className="page-content">
  {/* Page Heading Box ==== */}
  <div className="page-banner ovbl-dark" style={{backgroundImage: 'url(assets/images/banner/admission.jpg)'}}>
    <div className="container">
      <div className="page-banner-entry">
        <h1 className="text-white">Fees & Charges</h1>
      </div>
    </div>
  </div>
  <div className="breadcrumb-row">
    <div className="container">
      <ul className="list-inline">
        <li><a href="#">Home</a></li>
        <li>Fees & Charges</li>
      </ul>
    </div>
  </div>
  {/* Page Heading Box END ==== */}
  {/* Page Content Box ==== */}
  <div className="content-block">
    {/* Philosophy ==== */}
    <div className="section-area bg-gray section-sp1 our-story">
      <div className="container">
        <div className="row align-items-center d-flex">
          <div className="col-lg-8 col-md-12 heading-bx">
                  <ul className="course-features">
                    <li><i className="ti-check-box" /> <span className="label">01. Admission fee</span> <span className="value">Tk. 6,200/-</span></li> 
                    <li><i className="ti-check-box"/> <span className="label">02. Medical Check-up fee</span> <span className="value">Tk. 1,350/-</span></li>
                    <li><i className="ti-check-box" /> <span className="label">03. Registration fee</span> <span className="value">Tk. 500/-</span></li>
                    <li><i className="ti-check-box" /> <span className="label">04. ID Card fee</span> <span className="value">Tk. 300/-</span></li>
                    <li><i className="ti-check-box" /> <span className="label">05. Non judicial stamp</span> <span className="value">Tk. 300/-</span></li>
                    <li><i className="ti-check-box" /> <span className="label">7. Certificate Verification fee</span> <span className="value">Tk. 500/-</span></li>
                    <li><i className="ti-check-box" /> <span className="label">08. Tuition fee</span> <span className="value">Tk. 500/-(monthly)</span></li>
                    <li><i className="ti-check-box" /> <span className="label"><b>Total</b></span> <span className="value"><b>Tk. 11,100/-</b></span></li>
                    <li><i className="ti-check-box" /> <span className="label"><b>* Library & Lab Charge</b></span> <span className="value"><b>Tk. 3500/-</b>(Half Yearly, Before per semester final Examination)</span></li>
                    <li><i className="ti-check-box" /> <span className="label"><b>* Examination fee according to BNC rules & regulation</b></span> <span className="value">(Examination fee Midterm & final) each per semester.</span></li>
                    <li><i className="ti-check-box" /> <span className="label"><b>* Utility Fee</b></span> <span className="value">As per meter riding</span></li>
          
                  </ul>
            </div>
          <div className="col-lg-4 col-md-12 heading-bx p-lr">
            <div className="video-bx">
              <img src="assets/images/banner/banner.jpg" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Page Content Box END ==== */}
</div>

    )
  }
  
}

export default withRouter(AdmissionProcedure);