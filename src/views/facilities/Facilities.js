/**
 * About page
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Route , withRouter} from 'react-router-dom';


class About extends Component {

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
  <div className="page-banner ovbl-dark" style={{backgroundImage: 'url(assets/images/banner/g3.jpg)'}}>
    <div className="container">
      <div className="page-banner-entry">
        <h1 className="text-white">Facilities at a Glance</h1>
      </div>
    </div>
  </div>
  <div className="breadcrumb-row">
    <div className="container">
      <ul className="list-inline">
        <li><a href="#">Home</a></li>
        <li>Facilities at a Glance</li>
      </ul>
    </div>
  </div>
  {/* Page Heading Box END ==== */}
  {/* Page Content Box ==== */}
  <div className="content-block">
    <div className="section-area section-sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
            <div className="feature-container">
              <div className="feature-md text-white m-b20">
                <a href="#" className="icon-cell"><img src="assets/images/icon/institute.png" alt /></a> 
              </div>
              <div className="icon-content">
                <h5 className="ttr-tilte">Academic Building</h5>
                <p style={{textAlign: 'justify'}}>There is such an eye catching modern academic building for Khwaja Yunus Ali Nursing College (KYANC) that includes specious and furnished classrooms with full of fresh air that is very much important for the students.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
            <div className="feature-container">
              <div className="feature-md text-white m-b20">
                <a href="#" className="icon-cell"><img src="assets/images/icon/teacher.png" alt /></a> 
              </div>
              <div className="icon-content">
                <h5 className="ttr-tilte">Teachers</h5>
                <p  style={{textAlign: 'justify'}}>All the departments possess qualified and experienced full time as well as part time teachers. The teaching staff of KYA Nursing College includes Lecturers, Assistant Professors, Associate Professors and Professors as well. There is also a general Teaching Consultant in this college.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
            <div className="feature-container">
              <div className="feature-md text-white m-b20">
                <a href="#" className="icon-cell"><img src="assets/images/icon/lab.webp" alt /></a> 
              </div>
              <div className="icon-content">
                <h5 className="ttr-tilte">Laboratories</h5>
                <p style={{textAlign: 'justify'}}>KYA Nursing College is enriched with the necessary lab like Physiology lab, Anatomy lab, Pathology lab, Microbiology lab, Nutrition lab, Midwifery lab, General Nursing lab, and all the labs are well equipped with the sophisticated technological instrument. Beside these a rich museum and a well equipped Anatomy dissection Hall are also available.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
            <div className="feature-container">
              <div className="feature-md text-white m-b20">
                <a href="#" className="icon-cell"><img src="assets/images/icon/library.png" alt /></a> 
              </div>
              <div className="icon-content">
                <h5 className="ttr-tilte">Library</h5>
                <p>The college has a gigantic and well furnished library with a huge collection of common text-books, reference books, important journals on various subjects. The library has comfortable seating arrangement and noise fee silent atmosphere.  </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
            <div className="feature-container">
              <div className="feature-md text-white m-b20">
                <a href="#" className="icon-cell"><img src="assets/images/icon/auditorium.png" alt /></a> 
              </div>
              <div className="icon-content">
                <h5 className="ttr-tilte">Lecture Gallery:</h5>
                <p style={{textAlign: 'justify'}}>The college has four nice furnished and well ventilated lecture galleries along with necessary facilities.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
            <div className="feature-container">
              <div className="feature-md text-white m-b20">
                <a href="#" className="icon-cell"><img src="assets/images/icon/hostel.png" alt /></a> 
              </div>
              <div className="icon-content">
                <h5 className="ttr-tilte">Hostel</h5>
                <p  style={{textAlign: 'justify'}}>Hostel Facilities for the female students of the KYA Nursing College are available with the necessary security arrangements.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
            <div className="feature-container">
              <div className="feature-md text-white m-b20">
                <a href="#" className="icon-cell"><img src="assets/images/icon/teacher_dorm.png" alt /></a> 
              </div>
              <div className="icon-content">
                <h5 className="ttr-tilte">Teachers’ Dormitory</h5>
                <p style={{textAlign: 'justify'}}>Well furnished dormitory is available in the college campus for comfortable and healthy living of the teachers of KYA Nursing College.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
            <div className="feature-container">
              <div className="feature-md text-white m-b20">
                <a href="#" className="icon-cell"><img src="assets/images/icon/canteen.png" alt /></a> 
              </div>
              <div className="icon-content">
                <h5 className="ttr-tilte">Canteen Facility</h5>
                <p>A nice canteen is located near the college campus. A snack shop is also available in the Khwaja Yunus Ali Medical College & Hospital campus. </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
            <div className="feature-container">
              <div className="feature-md text-white m-b20">
                <a href="#" className="icon-cell"><img src="assets/images/icon/office.png" alt /></a> 
              </div>
              <div className="icon-content">
                <h5 className="ttr-tilte">Offices</h5>
                <p style={{textAlign: 'justify'}}>There is a nice office for the Principal of KYA Nursing College with experienced staff and with necessary modern facilities to implement the academic program as well as to run administrative activities of the college smoothly.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
            <div className="feature-container">
              <div className="feature-md text-white m-b20">
                <a href="#" className="icon-cell"><img src="assets/images/icon/conference.png" alt /></a> 
              </div>
              <div className="icon-content">
                <h5 className="ttr-tilte">Conference Room</h5>
                <p  style={{textAlign: 'justify'}}>There is a well decorated conference room in the college with necessary comfortable seating arrangement.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
            <div className="feature-container">
              <div className="feature-md text-white m-b20">
                <a href="#" className="icon-cell"><img src="assets/images/icon/sports.png" alt /></a> 
              </div>
              <div className="icon-content">
                <h5 className="ttr-tilte">Extracurricular facilities for the students</h5>
                {/* <p style={{textAlign: 'justify'}}>KYA Nursing College is enriched with the necessary lab like Physiology lab, Anatomy lab, Pathology lab, Microbiology lab, Nutrition lab, Midwifery lab, General Nursing lab, and all the labs are well equipped with the sophisticated technological instrument. Beside these a rich museum and a well equipped Anatomy dissection Hall are also available.</p> */}
                <ul className="list-checked primary">
                    <li style={{textAlign:"justify"}}>Different types of in-door games.</li>
                    <li style={{textAlign:"justify"}}>Sports & Games (out-door).</li>
                    <li style={{textAlign:"justify"}}>National day's celebration.</li>
                    <li style={{textAlign:"justify"}}>Cultural events like song, Dance, Debate, Drama etc.</li>
                    </ul>
              </div>
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

export default withRouter(About);