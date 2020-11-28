/**
 * Philosophy page
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';


class Philosophy extends Component {

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
        <h1 className="text-white">Philosophy</h1>
      </div>
    </div>
  </div>
  <div className="breadcrumb-row">
    <div className="container">
      <ul className="list-inline">
        <li><a href="#">Home</a></li>
        <li>Philosophy</li>
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
          <div className="col-lg-5 col-md-12 heading-bx">
            <h2 className="m-b10">Our Philosophy</h2>
            <h5 className="fw4" style={{textAlign: "justify"}}>Nursing' is such novel professions where one can earn enough for one's better living as well as get spiritual satisfaction simultaneously.</h5>
            <p style={{textAlign: "justify"}} >As women are the most neglected group in our society, the philosophy of the institute is to equip them with knowledge and skill and to elevate the dignity and status of them by assisting them to broaden their capacity. So that they can serve in their profession with utmost efficiency.</p>
            {/* <a href="#" className="btn">Read More</a> */}
          </div>
          <div className="col-lg-7 col-md-12 heading-bx p-lr">
            <div className="video-bx">
              <img src="assets/images/about/philosophy.png" alt />
              {/* <a target="_blank" href="https://www.youtube.com/watch?v=NvIS7AOCzTs" className="popup-youtube video"><i className="fa fa-play" /></a> */}
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

export default withRouter(Philosophy);