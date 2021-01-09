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

//   componentDidMount() {
    
//     this.props.history.goBack();
//   }
  render(){
    return(
        <div className="page-content">
  {/* Page Heading Box ==== */}
  <div className="page-banner ovbl-dark" style={{backgroundImage: 'url(assets/images/banner/g3.jpg)'}}>
    <div className="container">
      <div className="page-banner-entry">
        <h1 className="text-white">About Us</h1>
      </div>
    </div>
  </div>
  <div className="breadcrumb-row">
    <div className="container">
      <ul className="list-inline">
        <li><a href="#">Home</a></li>
        <li>About Us</li>
      </ul>
    </div>
  </div>
  {/* Page Heading Box END ==== */}
  {/* Page Content Box ==== */}
  <div className="content-block">
    {/* About Us ==== */}
    <div className="section-area section-sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
          <div className="feature-container">
                        <div className="feature-md text-white m-b20">
                          <Link to="/outcome-of-courses" className="icon-cell"><img src="assets/images/icon/icon1.png" alt /></Link> 
                        </div>
                        <div className="icon-content">
                          <h5 className="ttr-tilte">Outcome of Courses</h5>
                          <p>Outcome Of Diploma-In-Nursing Science & Midwifery Course  <Link to="/outcome-of-courses" className="btn button-md">Read More..</Link> </p>
                        </div>
                      </div>
                    </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
          <div className="feature-container">
                        <div className="feature-md text-white m-b20">
                          <Link to="/message-of-principle" className="icon-cell"><img src="assets/images/icon/icon2.png" alt /></Link> 
                        </div>
                        <div className="icon-content">
                          <h5 className="ttr-tilte">Message from the Principal</h5>
                          <p>This is the high time for young men and women to enter <Link to="/message-of-principle" className="btn button-md">Read More..</Link></p>
                        </div>
                      </div>
                    </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
          <div className="feature-container">
                        <div className="feature-md text-white m-b20">
                          <Link to="/vision-and-mission" className="icon-cell"><img src="assets/images/icon/icon3.png" alt /></Link> 
                        </div>
                        <div className="icon-content">
                          <h5 className="ttr-tilte">Key Of Success</h5>
                          <p>Vision of Khwaja Yunus Ali Nursing College is basically <Link to="/vision-and-mission" className="btn button-md">Read More..</Link></p>
                        </div>
                      </div>
                    </div>
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
          <div className="feature-container">
                        <div className="feature-md text-white m-b20">
                          <Link to="/philosophy" className="icon-cell"><img src="assets/images/icon/icon4.png" alt /></Link> 
                        </div>
                        <div className="icon-content">
                          <h5 className="ttr-tilte">Our Philosophy</h5>
                          <p>As women are the most neglected group in our society <Link to="/philosophy" className="btn button-md">Read More..</Link></p>
                        </div>
                      </div>
                    </div>
        </div>
      </div>
    </div>
    {/* About Us END ==== */}
    {/* Our Story ==== */}
    <div className="section-area bg-gray section-sp1 our-story">
      <div className="container">
        <div className="row align-items-center d-flex">
          <div className="col-lg-5 col-md-12 heading-bx">
            <h2 className="m-b10">Our Story</h2>
            <h5 className="fw4" style={{textAlign: "justify"}}>Nursing' is such novel professions where one can earn enough for one's better living as well as get spiritual satisfaction simultaneously.</h5>
            <p style={{textAlign: "justify"}} >The scope and opportunity for nursing profession, in home and abroad, is gradually increasing. Besides fulfilling internal need for nurses they also can earn foreign currencies by providing their services abroad and can play an important role in the national economy. But unfortunately government initiatives for nurses are too insufficient to create a good number of quality nurses. This is why Dr. M. M. AmjadHussain, one of the closest followers of the great saint "KhwajaEnayetpuri" (R.), took initiatives and has established KhwajaYunus Ali Nursing College.

Women are generally neglected, especially in our society, as they are neither well educated nor well established and basically in most of the cases this group is being treated as the inferior one as they are economically vulnerable and does not make any remarkable financial contribution to the family. This is why, the philosophy of the KYA Nursing College is to provide quality nursing education to this women group so that they can become skilled manpower, can earn enough to support their family needs, can change their lifestyle and can live with dignity and honor.</p>
            {/* <a href="#" className="btn">Read More</a> */}
          </div>
          <div className="col-lg-7 col-md-12 heading-bx p-lr">
            <div className="video-bx">
              <img src="assets/images/about/g4.jpg" alt />
              <a target="_blank" href="https://www.youtube.com/watch?v=NvIS7AOCzTs" className="popup-youtube video"><i className="fa fa-play" /></a>
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