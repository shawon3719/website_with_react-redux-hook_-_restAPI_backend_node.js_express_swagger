/**
 * Rules & Discipline page
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';


class RulesAndDiscipline extends Component {

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
        <h1 className="text-white">Rules And Discipline</h1>
      </div>
    </div>
  </div>
  <div className="breadcrumb-row">
    <div className="container">
      <ul className="list-inline">
        <li><a href="#">Home</a></li>
        <li>Rules And Discipline</li>
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
            <h2 className="m-b10">College Rules and Discipline</h2>
            <h5 className="fw4" style={{textAlign: "justify"}}>Conduct and discipline:</h5>
            <p style={{textAlign: "justify"}} >During their stay at the college all students are required to abide by all the rules and regulations of the college. Non-adherence to these rules and regulations marks the students liable to disciplinary action, which may range from warning to expulsion from the college. Students in KYANC are forbidden to organize any union, association or society other than those set up by the college authority in order to enrich their physical, intellectual and ethical development.</p>
            <h2 className="m-b10">Bonds from candidate and their guardians</h2>
            <p style={{textAlign: "justify"}} >The candidates and their parents or guardians are required to sign bonds on non-judicial stamp regarding the terms and conditions of study, conduct and discipline before admission to the college. Admission formalities will be incomplete without submission of the bond.</p>
          </div>
          <div className="col-lg-7 col-md-12 heading-bx p-lr">
            <div className="video-bx">
              <img src="assets/images/banner/rules.jpg" alt />
             </div>
          </div>
          <div className="col-lg-12 col-md-12 heading-bx">
          <h2 className="m-b10">Student bond:</h2>
          <p style={{textAlign: "justify"}} >I hereby declare that as a student of KYA Nursing College (KYANC), Sirajgonj I must follow the terms and conditions as follows:</p>
            <ul className="list-checked primary">
              <li style={{textAlign:"justify"}}>I shall abide by all the rules and regulations of the KYA Nursing College.</li>
              <li style={{textAlign:"justify"}}>I will refrain from any activities that my tarnish the image and credibility at KYANC, Sirajgonj.</li>
              <li style={{textAlign:"justify"}}>I shall not behave individually or collectively in any manner unbecoming of a student or   resort to any action prejudicial to the interest of the College of Hospital.</li>
              <li style={{textAlign:"justify"}}>I fully comprehended in sound mind. I am liable to be punished which may go up to expulsion from college for any misconduct as understood by the college authorities.</li>
              <li style={{textAlign:"justify"}}>I will not claim any money paid to the Nursing College authority if my admission is cancelled by myself or by nursing college authority.</li>
            </ul>
            <h2 className="m-b10">Medical Examinations</h2>
            <p style={{textAlign: "justify"}} >The selected candidates will be examined by a Medical Board for their physical fitness. The Medical Board will be formed by principal of TNC.</p>
            <h2 className="m-b10">Regulation for Library use:</h2>
            <p style={{textAlign: "justify"}} >All books, bags etc. of the students must be kept in the specified cubicles provided by the college. Students are responsible for the care of these articles. Students must carry their identity cards and membership cards for Library use.</p>
            <h2 className="m-b10">Library hours:</h2>
            <p style={{textAlign: "justify"}} >Library remains open from 8:30 am to 3:00 pm. At present students shall not be allowed to borrow more than two books from the library but they can study in the library by picking any book from the book shelf. After completion of reading, the students will leave the book on the table for the librarian or his staff to collect the book and to put it in its proper place.</p>
            <h2 className="m-b10">Student Guidance/Counseling:</h2>
            <p style={{textAlign: "justify"}} >All students are followed by teachers and they help and guide students in academic matters like studies, examination, attendance and conduct. Students are advised to meet their guide teacher or whenever asked by the guide teacher. Private tuition by faculty members is not allowed here.</p>
            <h2 className="m-b10">College Discipline:</h2>
            <p style={{textAlign: "justify"}} >Students must observe strict discipline in the college. On disciplinary grounds the following penalties may be imposed on a student, depending on the nature of offence:</p>
                <ul className="list-checked primary">
                    <li style={{textAlign:"justify"}}>Warning</li>
                    <li style={{textAlign:"justify"}}>Fines</li>
                    <li style={{textAlign:"justify"}}>Defer from appearing examinations.</li>
                    <li style={{textAlign:"justify"}}>Expulsion from the College, temporarily or permanent.</li>
                    <li style={{textAlign:"justify"}}>Any other punishment suggested by Academic/Disciplinary council is followed.</li>
                </ul>
            <h2 className="m-b10">Instructions for the students:</h2>
                <ul className="list-checked primary">
                    <li style={{textAlign:"justify"}}>Female students must be resident of student hostel where seats are available and 4 (four) persons shall share a single room. They shall arrange their own cot, study table, bookshelf as per specifications available in the Office of the hostel Superintendent/warden but all these elements will be supplied by the college. No musical instruments, heater, TV, refrigerator or any cooking device including stove are allowed in the student’s room.</li>
                    <li style={{textAlign:"justify"}}>Students have to carry their identity card while inside the College and Hospital.</li>
                    <li style={{textAlign:"justify"}}>Students are advised to attend classes wearing prescribed nursing dress assigned separately for students.</li>
                    <li style={{textAlign:"justify"}}>No students without wearing prescribed nursing dress are allowed to attend at the classes or in the college & hospital campus.</li>
                    <li style={{textAlign:"justify"}}>Rings, bangles are impediment in the practical classes and are therefore not allowed.</li>
                    <li style={{textAlign:"justify"}}>Environment should be kept clean and therefore, students are advised to throw litters into the waste bins.</li>
                    <li style={{textAlign:"justify"}}>Pasting of posters and writing of the college and hospital premises are prohibited. Those are considered as act of indiscipline and offends involved are liable to punishment.</li>
                    <li style={{textAlign:"justify"}}>Closing of college, hospital and department gates or doors and creating obstacles in the normal functioning are act gross indiscipline and students involved in such acts are liable to expelled from the college.</li>
                    <li style={{textAlign:"justify"}}>All types of demonstrations, processions, shouting in the college and hospitals premises are prohibited and students involved in them are liable to be expelled from the college.</li>
                    <li style={{textAlign:"justify"}}>Absent from classes, individuals or in a mass without prior information and without valid reason are punishable by imposition of daily fine of Tk. 50/= individually and latter on guardians will be informed of such acts of their wards.</li>
                    <li style={{textAlign:"justify"}}>Students will state their problems/grievances/inconveniences to their Guide Teacher (list of the teachers who will act as students guide are notified separately). The guide will solve the problems of the students himself/herself or refer them to the Principal or a special committee formed especially for the purpose. Statement of the grievances/problems/inconveniences by the students must be in an orderly and disciplined manner. Any act or indiscipline on the part of any student including usage of abusive words or objectionable words and sentences will make the student liable to be punished by expulsion from the college.</li>
                    <li style={{textAlign:"justify"}}>Students must not misbehave with the staffs or employees of the college & hospital. Misbehavior is an act of indiscipline and liable for punishment.</li>
                    <li style={{textAlign:"justify"}}>The students are expected to maintain the highest standard in their academic and private lives. Loss of moral and spiritual values or addiction to alcohol and narcotic drugs are punishable.</li>
                    <li style={{textAlign:"justify"}}>At the time of admission into the college, students and parents/guardians will have to sign a bond that their children/ward will abide by the rules and regulations of the college.</li>
                    <li style={{textAlign:"justify"}}>Every student shall provide for himself/herself all the prescribed text books, dissecting instruments and medical equipments. The college will not supply these to the student.</li>
                    <li style={{textAlign:"justify"}}>Leave: In case of Wellness or other unavoidable reasons of not attendance a written statement from the parents/guardian should be presented to the principal who will approve.</li>
                    <li style={{textAlign:"justify"}}>Cost of loss/damage to college/hospital properly is liable to be realized from the students who are found responsible for the loss/damage of college/hospital property.</li>
                    <li style={{textAlign:"justify"}}>Political activities are not permitted in the college at all.</li>
                    <li style={{textAlign:"justify"}}>Students need to take out-pass before leaving the college campus during vacation and for matters that would take them to outside college compound.</li>
                    <li style={{textAlign:"justify"}}>The legal guardians of the female students must collect their wards before leaving the Hostel compound.</li>
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

export default withRouter(RulesAndDiscipline);