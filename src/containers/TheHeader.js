import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PageDataService from "../_services/PageService";


// routes config
import routes from '../routes'

import './TheHeader.css'

import { Link } from 'react-router-dom'

const pageNo = window.location.toString()


const TheHeader = pageNo => {


const [pages, setPages] = useState([]);

useEffect(() => {
  retrievePages();
}, [pageNo]);


const retrievePages = () => {
  PageDataService.getAll()
    .then(response => {
      setPages(response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
};


    const TheHeaderVar = () => {
      const dispatch = useDispatch()
      const sidebarShow = useSelector(state => state.sidebarShow)
    
      const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
        dispatch({type: 'set', sidebarShow: val})
      }
    
      const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
        dispatch({type: 'set', sidebarShow: val})
      }
    
      return (
    <header className="header rs-nav">
      <div className="top-bar">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="topbar-left">
              <ul>
                {/* <li><a href="faq-1.html"><i className="fa fa-question-circle" />Ask a Question</a></li> */}
                <li><a href="javascript:;"><i className="fa fa-envelope-o" />info@kyanc.edu.bd</a></li>
              </ul>
            </div>
            <div className="topbar-right">
              <ul>
                <li><i class="fa fa-mobile" aria-hidden="true"></i> +880 1915 477 962</li>
                <li><i class="fa fa-phone" aria-hidden="true"></i> +880 7516 3760-4</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky-header navbar-expand-lg">
        <div className="menu-bar clearfix">
          <div className="container clearfix">
            {/* Header Logo ==== */}
            <div className="menu-logo">
              <Link to="/"><img src="assets/images/kyanc_logo.jpg" alt /></Link>
              {/* <span style={{color: "red"}}>KYANC</span> */}
            </div>
            {/* Mobile Nav Button ==== */}
            <button className="navbar-toggler collapsed menuicon justify-content-end" type="button" data-toggle="collapse" data-target="#menuDropdown" aria-controls="menuDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span />
              <span />
              <span />
            </button>
            {/* Author Nav ==== */}
            <div className="secondary-menu">
              <div className="secondary-inner">
                <ul>
                  <li><a href="javascript:;" className="btn-link"><i className="fa fa-facebook" /></a></li>
                  <li><a href="javascript:;" className="btn-link"><i className="fa fa-google-plus" /></a></li>
                  <li><a href="javascript:;" className="btn-link"><i className="fa fa-linkedin" /></a></li>
                  {/* Search Button ==== */}
                  {/* <li className="search-btn"><button id="quik-search-btn" type="button" className="btn-link"><i className="fa fa-search" /></button></li> */}
                </ul>
              </div>
            </div>
            {/* Search Box ==== */}
            <div className="nav-search-bar">
              <form action="#">
                <input name="search" defaultValue type="text" className="form-control" placeholder="Type to search" />
                <span><i className="ti-search" /></span>
              </form>
              <span id="search-remove"><i className="ti-close" /></span>
            </div>
            {/* Navigation Menu ==== */}
            <div className="menu-links navbar-collapse collapse justify-content-start" id="menuDropdown">
              <div className="menu-logo">
                <a href="index.html"><img src="assets/images/kyanc_logo.jpg" alt /></a>
              </div>
              <ul className="nav navbar-nav">	
                <li className="active"><Link to="/">Home</Link></li>
                <li><a href="javascript:;">About <i className="fa fa-chevron-down" /></a>
                  <ul className="sub-menu">
                    {/* <li><a href="javascript:;">Contact Us<i className="fa fa-angle-right" /></a>
                      <ul className="sub-menu">
                        <li><a href="contact-1.html">Contact Us 1</a></li>
                        <li><a href="contact-2.html">Contact Us 2</a></li>
                      </ul>
                    </li> */}
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/facilities">Facilities At a Glance</Link></li>
                    <li><Link to="/vision-and-mission">Vision & Mission</Link></li>
                    <li><Link to="/message-of-principle">Principal Message</Link></li>
                    <li><Link to="/teachers-and-stuffs">Teachers & Staffs</Link></li>
                    <li><a href="#">Students Information</a></li>
                  </ul>
                </li>
                <li className="add-mega-menu"><a href="javascript:;">Admission<i className="fa fa-chevron-down" /></a>
                  <ul className="sub-menu add-menu">
                    <li className="add-menu-left">
                      <h5 className="menu-adv-title">Admission Info</h5>
                      <ul>
                        <li><Link to="/admission-procedure">Admission Procedure</Link></li>
                        <li><Link to="/fees-and-charges">Fees & Charges</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/outcome-of-courses">Outcome of Courses</Link></li>
                      </ul>
                    </li>
                    <li className="add-menu-right">
                      <img src="assets/images/adv/adv.jpg" alt />
                    </li>
                  </ul>
                </li>
                <li className="add-mega-menu"><a href="javascript:;">Academic<i className="fa fa-chevron-down" /></a>
                  <ul className="sub-menu add-menu">
                    <li className="add-menu-left">
                      <h5 className="menu-adv-title">Academic Info</h5>
                      <ul>
                        <li><a href="#">Academic Calendar</a></li>
                        <li><Link to="/rules-and-discipline">Rules & Disciplines</Link></li>
                        <li><Link to="/teachers-and-stuffs">Teachers & Staffs</Link></li>
                        <li><a href="#">Students Info.</a></li>
                      </ul>
                    </li>
                    <li className="add-menu-right">
                      <img src="assets/images/adv/adv.jpg" alt />
                    </li>
                  </ul>
                </li>
                <li className="active"><Link to="/philosophy">Philosophy</Link></li>
                <li className="active"><Link to="/gallery">Photo Gallery</Link></li>
                <li className="active"><Link to="/contact">Contact Us</Link></li>
                <li className="active bg-template blink"><Link to="#"><span>Notice</span> <i className="fa fa-chevron-down" /></Link>
               
                  <ul className="sub-menu">
                    
                      { pages &&
                        pages.map((page, index) => (
                            <li><Link to={'/page/id='+page.id}>{page.title}</Link></li>
                        ) )
                      }
                      
                    <li><Link to="#">BSc. Mid-term Exam</Link></li>
                    <li><Link to="#">Diploma Admission Form<span className="blink-text" style={{color:'red', fontWeight:"bold", fontSize:'20px'}}>*</span></Link></li>
                    <li><Link to="#">BSc. Admission Form<span className="blink-text" style={{color:'red', fontWeight:"bold", fontSize:'20px'}}>*</span></Link></li>
                    
                  </ul>
                  
                  
                </li>
              </ul>
              <div className="nav-social-link">
                <a href="javascript:;"><i className="fa fa-facebook" /></a>
                <a href="javascript:;"><i className="fa fa-google-plus" /></a>
                <a href="javascript:;"><i className="fa fa-linkedin" /></a>
              </div>
            </div>
            {/* Navigation Menu END ==== */}
          </div>
        </div>
      </div>
    </header>
      
      )
    }
      return(
        <TheHeaderVar/>
      );
    }
export default TheHeader

