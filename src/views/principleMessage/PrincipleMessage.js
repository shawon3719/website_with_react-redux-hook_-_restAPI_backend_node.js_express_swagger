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


class PrincipleMessage extends Component {

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
        <h1 className="text-white">Message of Principal</h1>
      </div>
    </div>
  </div>
  <div className="breadcrumb-row">
    <div className="container">
      <ul className="list-inline">
        <li><a href="#">Home</a></li>
        <li>Message of Principal</li>
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
            <h2 className="m-b10">Message from the Principal</h2>
            {/* <h5 className="fw4" style={{textAlign: "justify"}}>Nursing' is such novel professions where one can earn enough for one's better living as well as get spiritual satisfaction simultaneously.</h5> */}
            <p style={{textAlign: "justify"}} >This is the high time for young men and women to enter the profession of nursing. Day by day the demand for quality nurses is increasing and the opportunities for nursing profession are practically unlimited both in our country and abroad. In addition, it is such a profession that gives one the spiritual satisfaction that comes from providing nursing services to patients, families and communities. </p>
            <p style={{textAlign: "justify"}} >At present there are both "Diploma" and "BSc" (Post Basic) in nursing courses in Bangladesh and after completion of these courses one can engaged oneself in varieties working field like critical care, neighborhood clinics, surgery, pediatrics or emergency rooms or so on like these. It is known that, a strong education is the foundation for any professional success.  </p>
          </div>
          <div className="col-lg-7 col-md-12 heading-bx p-lr">
            <div className="video-bx">
              <img src="assets/images/profile/principal.jpg" alt />
             </div>
          </div>
          <div className="col-lg-12 col-md-12 heading-bx">
          {/* <h2 className="m-b10">Our Mission</h2> */}
            {/* <h5 className="fw4" style={{textAlign: "justify"}}>Nursing' is such novel professions where one can earn enough for one's better living as well as get spiritual satisfaction simultaneously.</h5> */}
            <p style={{textAlign: "justify"}} >That is why KYA Nursing College ensures an excellent start for the lucrative nursing career. KYA Nursing College has an ideal learning environment that helps to create ideal, energetic and quality nurses. The students of KYA Nursing College are also being benefitted from:</p>
            <ul className="list-checked primary">
              <li style={{textAlign:"justify"}}>The committed faculty who are expert clinicians, teachers and mentors.</li>
              <li style={{textAlign:"justify"}}>The strong clinical program with experiences in diverse health care settings.</li>
              <li style={{textAlign:"justify"}}>The innovative and rich nursing curriculum with a community focus that reflects the best practices in an ever changing health care environment.</li>
              <li style={{textAlign:"justify"}}>The culture of respect and professionalism based on the KYANC tradition of service and commitment to its students and community.</li>
              <li style={{textAlign:"justify"}}>The High-tech learning labs with the latest in teaching tools as well as sophisticated technology.</li>
            </ul>
            <p style={{textAlign: "justify"}} >Nurse is the on of the most important and key elements for the health care services. To manage as well as to run the nursing services smoothly quality nurses is a must. But unfortunately there is a huge lack of quality manpower in this sector both in home and abroad. </p>
            <p style={{textAlign: "justify"}} >So, if you want to get the opportunity of a nice career, choose nursing. Take the chance of working within the country and abroad. Change your lifestyle by handsome earnings, live with honor, and play an important role in economy. Don't waste your time and let's start now. I invite you at KYA Nursing College to become a quality nurse.</p>
            <p style={{textAlign: "justify"}} ><b>Rowshonara Khatun</b><br></br>principal<br></br>BSc. in Nursing, MPH<br></br>Mobile: +880 1714 940 727<br></br>E-mail: principal@kyau.edu.bd</p>
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

export default withRouter(PrincipleMessage);