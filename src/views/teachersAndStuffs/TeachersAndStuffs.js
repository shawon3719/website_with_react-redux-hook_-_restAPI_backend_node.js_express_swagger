/**
 * Teachers And Stuffs page
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Route , withRouter} from 'react-router-dom';
import './teacherAndStuff.css'
import { useDispatch, useSelector } from 'react-redux';
import { employeeActions, userActions } from "src/_actions";
import { scrollToTop } from 'src/_reducers/scroll.reducer';
import {customUrl} from "src/reusable/apiHost";


const TeachersAndStuffs = (props) => {
  const employees = useSelector(state => state.employees);
  const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(employeeActions.getAll());
      scrollToTop();   
   }, []);
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
            {
                      employees.items &&
                      employees.items.map((employee, index) => (
  <li>
    <a href="#">
      <img src={customUrl+employee.profile_photo} />
      <span className="member-title">{employee.full_name}</span>
      <span className="member-title-hover">{employee.designation}</span>
    </a>
  </li>
    ))}
</ul>
            </div>
          </div>
        </div>
        {/* Page Content Box END ==== */}
      </div>


)
}

export default TeachersAndStuffs
