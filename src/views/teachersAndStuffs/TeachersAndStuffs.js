/**
 * Teachers And Stuffs page
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Route , withRouter} from 'react-router-dom';
import './teacherAndStuff.css'

class TeachersAndStuffs extends Component {
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
        <div className="page-banner ovbl-dark" style={{backgroundImage: 'url(assets/images/banner/allteacher.jpg)'}}>
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">Teachers And Stuffs</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li><a href="#">Home</a></li>
              <li>Teachers And Stuffs</li>
            </ul>
          </div>
        </div>
        {/* Page Heading Box END ==== */}
        {/* Page Content Box ==== */}
        <div className="content-block">
          {/* Philosophy ==== */}
          <div className="section-area bg-gray section-sp1 our-story">
            <div className="container">
            <ul className="list-team-members">
  <li>
    <a href="#">
      <img src="assets/images/profile/principal.jpg" />
      <span className="member-title">Rowshonara Khatun</span>
      <span className="member-title-hover">Principal</span>
    </a>
  </li>
  <li>
    <a href="#">
      <img src="http://fliegentech.com/public/upload/user_images/team_34.jpg" />
      <span className="member-title">Naveed Anjum</span>
      <span className="member-title-hover">Vice Principle</span>
    </a>
  </li>
  <li>
    <a href="#">
      <img src="http://fliegentech.com/public/upload/user_images/team_37.jpg" />
      <span className="member-title">Md. Kabir Hussain</span>
      <span className="member-title-hover">Asst. Professor</span>
    </a>
  </li>
  <li>
    <a href="#">
      <img src="http://fliegentech.com/public/upload/user_images/team_46.jpg" />
      <span className="member-title">Syed Tausif</span>
      <span className="member-title-hover">Math Teacher</span>
    </a>
  </li>
</ul>
<ul className="list-team-members">
  <li>
    <a href="#">
      <img src="assets/images/profile/principal.jpg" />
      <span className="member-title">Rowshonara Khatun</span>
      <span className="member-title-hover">Principal</span>
    </a>
  </li>
  <li>
    <a href="#">
      <img src="http://fliegentech.com/public/upload/user_images/team_34.jpg" />
      <span className="member-title">Naveed Anjum</span>
      <span className="member-title-hover">Vice Principle</span>
    </a>
  </li>
  <li>
    <a href="#">
      <img src="http://fliegentech.com/public/upload/user_images/team_37.jpg" />
      <span className="member-title">Md. Kabir Hussain</span>
      <span className="member-title-hover">Asst. Professor</span>
    </a>
  </li>
  <li>
    <a href="#">
      <img src="http://fliegentech.com/public/upload/user_images/team_46.jpg" />
      <span className="member-title">Syed Tausif</span>
      <span className="member-title-hover">Math Teacher</span>
    </a>
  </li>
</ul>

            </div>
          </div>
        </div>
        {/* Page Content Box END ==== */}
      </div>


    )
  }
  
}

export default withRouter(TeachersAndStuffs);