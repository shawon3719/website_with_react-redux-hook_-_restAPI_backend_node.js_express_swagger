/**
 * Philosophy page
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';


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
        <h1 className="text-white">Admission Procedure</h1>
      </div>
    </div>
  </div>
  <div className="breadcrumb-row">
    <div className="container">
      <ul className="list-inline">
        <li><a href="#">Home</a></li>
        <li>Admission Procedure</li>
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
            <h2 className="m-b10">Admission Policy</h2>
            <p style={{textAlign: "justify"}} >Admission to KYA Nursing College for the three-year Diploma-in Nursing Science & Midwifery Course, and two-year Post Basic BSC.-in-Nursing Course degree are open to all individual and meeting the selection criteria laid down in the concerned college prospectus. The number of students admitted per session is 50 in Diploma-in Nursing Science & Midwifery Course and 30 students in two-year Post Basic BSC.-in-Nursing Course.</p>
            <h2 className="m-b10">Eligibility Criteria</h2>
            <ul className="list-checked primary">
                    <li style={{textAlign:"justify"}}>The candidates must be a permanent citizen of Bangladesh.</li>
                    <li style={{textAlign:"justify"}}>Candidates having 18-22 years of old at the last date of application submission date are eligible for getting admission. </li>
                    <li style={{textAlign:"justify"}}>Candidates who have passed SSC and HSC examination in the specified year from any recognized education Board and obtained combined GPA of 4.75 & individual (minimum 2.25 in SSC and minimum 2.50 in HSC). </li>
                    <li style={{textAlign:"justify"}}>Candidates must be sound in both physically and mentally.</li>
            </ul>
          </div>
          <div className="col-lg-7 col-md-12 heading-bx p-lr">
            <div className="video-bx">
              <img src="assets/images/banner/nurse.png" alt />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 heading-bx">
          <h2 className="m-b10">Admission Process:</h2>
            <p style={{textAlign: "justify"}} >The applications for admission to the specific courses (i.e. College for the three-year Diploma-in Nursing Science & Midwifery Course and two-year Post Basic BSC.-in-Nursing Course) of the Khwaja Yunus Ali Nursing College at Sirajgonj, Enayetpur are invited through an advertisement published in the prominent Dailies. All candidates applying for admission to the courses against open merit seats and all other categories of seats are required to pass the Entry Test with a minimum score fixed by the authority. Application form, Prospectus and further information are available from the office of the Principal & from designated areas/ centers of Khwaja Yunus Ali Nursing College. Contact No.01792890196.</p>
            <p style={{textAlign: "justify"}} >It is mentionable that a candidate for admission must submit an application in his own handwriting, in prescribed Application Form. This form, duly completed in all respect along with necessary documents, must be submitted to the office of the Principal within the last date. Incomplete, defective and late applications will not be considered and no correspondence in this matter will be entertained.</p>
          <h2 className="m-b10" >Certificates / following documents to be attached to Application Form (for Diploma in Nursing Science & Midwifery Course):</h2>
            <ul className="list-checked primary">
                    <li style={{textAlign:"justify"}}>Copy of SSC and HSC or equivalent certificates and academic transcripts (duly attested.);</li>
                    <li style={{textAlign:"justify"}}>Conduct certificate/Testimonial from the Head of the Institution.</li>
                    <li style={{textAlign:"justify"}}>Four Copies of attested passport size photographs and two copies of stamp size (Colored, front view);</li>
                    <li style={{textAlign:"justify"}}>Citizenship Certificate by Uninon Parishad/Municipality;</li>
                    <li style={{textAlign:"justify"}}>Declaration of financial solvency of parents/Guardian;</li>
                    <li style={{textAlign:"justify"}}>Certificate of extracurricular achievements if any.</li>
            </ul>
            <h2 className="m-b10" >Selection of Candidates</h2>
            <p style={{textAlign: "justify"}} >The merit of the candidates is worked out as under: Final selection of candidates shall be on merit based on scores of</p>
            <ul className="list-checked primary">
                    <li style={{textAlign:"justify"}}>Admission Test (MCQ): <b>100</b></li>
                    <li style={{textAlign:"justify"}}>Viva Voce:  <b>25</b></li>
                    <li style={{textAlign:"justify"}}>Total:  <b>125</b></li>
            </ul>
            <p style={{textAlign: "justify"}} >Admission Test shall consists of an hour’s written Examination consisting of MCQ (If nesessary) based on in Bangla (20 marks), English (20 marks), General knowledge (20 marks), General mathematics (20 marks), primary health care (10 marks) and Geography (10 marks).</p>
            <p style={{textAlign: "justify"}} >The merit list of candidates is prepared by the office of The Chairman, Admission Board.</p>
            <h2 className="m-b10" >Admission to the course</h2>
            <p style={{textAlign: "justify"}} >List of finally selected candidates will be notified in the College Notice Board. Two types of list (merit list and waiting list) are notified.  Candidates finally selected shall have to be admitted by the announced date and time. Otherwise their selection may be cancelled and the place will be filled up from among the candidates in waiting list. </p>
            <h2 className="m-b10" >Expense of the Course</h2>
            <p style={{textAlign: "justify"}} >Tuition and other fees payable at the time of admission will be notified in the college notice board. All payments are to be made as per KYANC admission rule. Thus, the admission and Tuition fees are charged according to the policy of Board of directors of KYANC. It also varies from one year to another year depending on policy meeting.</p>
            <h2 className="m-b10" >Medical Examinations</h2>
            <p style={{textAlign: "justify"}} >The selected candidates will be examined by a Medical Board for their physical fitness. The Medical Board will be formed by principal of KYANC.</p>
            <h2 className="m-b10" >Bonds from candidate and their guardians</h2>
            <p style={{textAlign: "justify"}} >The candidates and their parents or guardians are required to sign bonds on non-judicial stamp regarding the terms and conditions of study, conduct and discipline before admission to the college. Admission formalities will be incomplete without submission of the bond.</p>
            
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