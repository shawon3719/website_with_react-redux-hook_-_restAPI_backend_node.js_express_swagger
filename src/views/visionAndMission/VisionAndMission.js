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


class VisionAndMission extends Component {

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
        <h1 className="text-white">Vision and Mission</h1>
      </div>
    </div>
  </div>
  <div className="breadcrumb-row">
    <div className="container">
      <ul className="list-inline">
        <li><a href="#">Home</a></li>
        <li>Vision ands Mission</li>
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
            <h2 className="m-b10">Our Vision</h2>
            {/* <h5 className="fw4" style={{textAlign: "justify"}}>Nursing' is such novel professions where one can earn enough for one's better living as well as get spiritual satisfaction simultaneously.</h5> */}
            <p style={{textAlign: "justify"}} >Vision of Khwaja Yunus Ali Nursing College is basically aimed at to help in materializing a speech of the great saint Khwaja Yunus Ali (R) who is popularly known as "Khwaja Enayetpuri" (R). One fine morning, after praying salat of fazr the saint came to the bank of the river Jamuna, at present where Khwaja Yunus Ali Medical College & Hospital is situated, with some of his murid (followers) and hammered a wooden peg at a place and told- Once there will be an establishment in this place for the welfare of mass people and society. To make the saint's speech true Dr. M. M. Amjad Hussain, one of the closest followers of Khwaja Enayetpiri (R), established 'Khwaja Yunus Ali Medical College & Hospital' and later on to run the hospital and college smoothly he also established 'Khwaja Yunus Ali Nursing College'. So, vision of 'Khwaja Yunus Ali Nursing College' is to support 'Khwaja Yunus Ali Medical College & Hospital' as well as to materialize the speech of the visionary Khwaja Enayetpiri (R).</p>
            {/* <a href="#" className="btn">Read More</a> */}
          </div>
          <div className="col-lg-7 col-md-12 heading-bx p-lr">
            <div className="video-bx">
              <img src="assets/images/about/philosophy.png" alt />
              {/* <a target="_blank" href="https://www.youtube.com/watch?v=NvIS7AOCzTs" className="popup-youtube video"><i className="fa fa-play" /></a> */}
            </div>
          </div>
          <div className="col-lg-12 col-md-12 heading-bx">
          <h2 className="m-b10">Our Mission</h2>
            {/* <h5 className="fw4" style={{textAlign: "justify"}}>Nursing' is such novel professions where one can earn enough for one's better living as well as get spiritual satisfaction simultaneously.</h5> */}
            <p style={{textAlign: "justify"}} >To actualize the speech of the great saint Khwaja Enayetpuri (R), Dr. M. M. Amjad Hussain established 'Khwaja Yunus Ali Medical College & Hospital' and to support that he also established 'Khwaja Yunus Ali Nursing College'. So, the prime mission of 'Khwaja Yunus Ali Nursing College' is to support the 'Khwaja Yunus Ali Medical College & Hospital' by ensuring quality nursing manpower required by the organization. Other missions those the concern aims to achieve are as follows-</p>
            <ul className="list-checked primary">
                    <li style={{textAlign:"justify"}}>Creating opportunity of getting a blessing education and taking it as a novel profession, so that one can improve one's life style with spiritual satisfaction.</li>
                    <li style={{textAlign:"justify"}}>Producing quality nursing manpower that will be able enough to serve the society.</li>
                    <li style={{textAlign:"justify"}}>Ensuring nursing manpower with necessary moral values as well as with working expertness.</li>
                    <li style={{textAlign:"justify"}}>Meeting world's manpower demand in nursing services and earning foreign currency.</li>
                    <li style={{textAlign:"justify"}}>Ensuring such an efficient workforce who are well educated and fully acquainted with the sophisticated technologies using worldwide.</li>
            </ul>
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

export default withRouter(VisionAndMission);