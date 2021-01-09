/**
 * Philosophy page
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';


class OutComeOfCourses extends Component {

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
        <h1 className="text-white">Outcome Of Courses</h1>
      </div>
    </div>
  </div>
  <div className="breadcrumb-row">
    <div className="container">
      <ul className="list-inline">
        <li><a href="#">Outcome Of Courses</a></li>
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
            <h2 className="m-b10">Outcome Of Diploma-In-Nursing Science & Midwifery Course</h2>
            <p style={{textAlign: "justify"}} >Nursing is a dynamic, continuous learning process of acquiring nursing and midwifery knowledge and skills that bring about changes of student behaviors. However, students who will complete the Diploma program will be a competent nurse-midwifery who can demonstrate the competency of nursing knowledge-based practice for provision of quality holistic client-centered nursing care to meet needs/expectations and to promote, maintain and restore health of individuals, families and communities in common and simple health problems/situations. As the registered nurse-midwifery, they would also be able to: </p>
        
          </div>
          <div className="col-lg-7 col-md-12 heading-bx p-lr">
            <div className="video-bx">
              <img src="assets/images/about/philosophy.png" alt />
              {/* <a target="_blank" href="https://www.youtube.com/watch?v=NvIS7AOCzTs" className="popup-youtube video"><i className="fa fa-play" /></a> */}
            </div>
          </div>
        <div className="col-lg-12 col-md-12 heading-bx">
            <h2 className="m-b10">1. Demonstrate to have knowledge in following areas-</h2>
            <ul className="list-checked primary">
                    <li style={{textAlign:"justify"}}>Basic sciences, applied sciences and human sciences.</li>
                    <li style={{textAlign:"justify"}}>Nursing science focusing on interpersonal communication, nursing process, holistic nursing, community-oriented nursing and knowledge requiring for making clinical nursing judgment in common and simple health problems/situations of nursing clients across the life-span and across health illness continuum.</li>
                    <li style={{textAlign:"justify"}}>Nursing leadership and management.</li>
                    <li style={{textAlign:"justify"}}>National health care policy.</li>
                    <li style={{textAlign:"justify"}}>Emerging local and global health issues.</li>
                    <li style={{textAlign:"justify"}}>Basic research and evidence-based nursing.</li>
                    <li style={{textAlign:"justify"}}>Basic self-inquiry and computer.</li>
            </ul>
            <h2 className="m-b10">2. Demonstrate to have skills in:</h2>
            <ul className="list-checked primary">
                    <li style={{textAlign:"justify"}}>Using nursing process with knowledge-based clinical skills and critical thinking skills in caring for clients with common and simple health problems/situations across the life-span and across health-illness continuum in order to promote, maintain and restore health.</li>
                    <li style={{textAlign:"justify"}}>Providing client-oriented and holistic care with caring behaviors.</li>
                    <li style={{textAlign:"justify"}}>Carrying out knowledge-based and community-oriented nursing practice with positive attitudes, ethical behaviors and accountability in accordance with the BNC rules and regulations and professional standards.</li>
                    <li style={{textAlign:"justify"}}>Communicating effectively with nursing clients, nursing members, physicians and other health care providers.</li>
                    <li style={{textAlign:"justify"}}>Working collaborate in a health care team and as a member or a novice leader of the nursing care team.</li>
                    <li style={{textAlign:"justify"}}>Managing own work on a day-to-day basis.</li>
                    <li style={{textAlign:"justify"}}>Guiding and fostering good clinical environment to nursing students and other support staff who work under nursing supervision.</li>
                    <li style={{textAlign:"justify"}}>Thinking critically and committing to self-directed learning. </li>
            </ul>
            <h2 className="m-b10">OUTCOME OF POST BASIC-BSN PROGRAM:</h2>
            <ul className="list-checked primary">
                    <li style={{textAlign:"justify"}}>The students admitted to the Post Basic-BSN Program will graduate within 2 years.</li>
                    <li style={{textAlign:"justify"}}>At the time of program completion, Post Basic-USN students will appear in the licensure examination of BNC.</li>
                    <li style={{textAlign:"justify"}}>After passing the licensure examination of BNC, Post Basic start reviewing NCLEX-RN examination and can process their employment in USA.</li>
                    <li style={{textAlign:"justify"}}>At the time of program completion, students will report utilizing research findings and evidenced-based practice in their practice setting.</li>
                    <li style={{textAlign:"justify"}}>At the time of program completion, graduates will report the acquisition of enhanced computer and presentation skills.</li>
                    <li style={{textAlign:"justify"}}>Graduates will report improved professional knowledge and competence by continuing education and nursing specialization.</li>
            </ul>
            <h2 className="m-b10">The POST BASIC-BSN Program graduate will be able to: </h2>
            <ul className="list-checked primary">
                    <li style={{textAlign:"justify"}}>Integrate spiritual, cultural, and developmental concepts and values in providing and managing care for clients.</li>
                    <li style={{textAlign:"justify"}}>Synthesize knowledge from the humanities, bio-psychosocial and nursing sciences in providing and managing care.</li>
                    <li style={{textAlign:"justify"}}>Use management/leadership skill and knowledge of the socio-political system in providing comprehensive, therapeutic nursing care.</li>
                    <li style={{textAlign:"justify"}}>Use the nursing process to provide nursing care to clients, groups, and communities.</li>
                    <li style={{textAlign:"justify"}}>Collaborate with clients, groups, communities, and other health care providers in the delivery of health care.</li>
                    <li style={{textAlign:"justify"}}>Incorporate findings from nursing and health –related research in promoting health and in the delivery of nursing care.</li>
                    <li style={{textAlign:"justify"}}>Participate in the delivery of health services by functioning in nursing roles necessary to meet the needs of a changing society.</li>
                    <li style={{textAlign:"justify"}}>Practice within the profession’s legal and ethical boundaries to meet the health care needs of clients, groups, and communities.</li>
                    <li style={{textAlign:"justify"}}>Assume responsibility for continuing personal, professional and education development necessary to function in a rapidly changing health care environment.</li>
                    <li style={{textAlign:"justify"}}>To prepare themselves to be dedicated in their profession for the betterment of the patient/ client and humanity.</li>
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

export default withRouter(OutComeOfCourses);