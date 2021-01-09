/**
 * Dynamic page
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { useState, useRef, useEffect } from 'react';
import throttle from 'lodash/throttle';
import PageDataService from "../../_services/PageService";
import { scrollToTop } from "../../_reducers/scroll.reducer"
import { useDispatch, useSelector } from 'react-redux';

import { calendarActions } from '../../_actions/calendar.action';
import {  Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
import { CButton } from "@coreui/react";
import { Link } from 'react-router-dom';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Calendar = (data, onDocumentLoadSuccess) => {

const initialPageState = {
  file : ''
};

const calendars = useSelector(state => state.calendars);
const calendar = useSelector(state => state.calendars.calendar);
const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);
const [prevBtnDisbaled, setPrevBtnStatus] = useState(false);
const [nextBtnDisbaled, setNextBtnStatus] = useState(false);

const dispatch = useDispatch();

const [initialWidth, setInitialWidth] = useState(null);
const pdfWrapper = useRef(null);

const setPdfSize = () => {
  if (pdfWrapper && pdfWrapper.current) {
    setInitialWidth(pdfWrapper.current.getBoundingClientRect().width);
  }
};

useEffect(() => {
  //Get Calendar File
  dispatch(calendarActions.getAll());

  //Responsive PDF
  window.addEventListener('resize', throttle(setPdfSize, 3000));
  setPdfSize();
  return () => {
    window.removeEventListener('resize', throttle(setPdfSize, 3000));
  };

  //Scroll to Top
  scrollToTop();
}, []);

function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages);
}

function handlePrevPage(){
  if(pageNumber >= 2){
    setPageNumber(pageNumber - 1 )
    setPrevBtnStatus(false)
    setNextBtnStatus(false)
  }else{
    setPrevBtnStatus(true)
  }
}

function handleNextPage(){
  if(pageNumber <= numPages-1){
    setPageNumber(pageNumber + 1 )
    setNextBtnStatus(false)
    setPrevBtnStatus(false)
  }else{
    setNextBtnStatus(true)
  }
}



    return(
      <div className="page-content">
        <div>
        <div className="page-banner ovbl-dark" style={{backgroundImage: 'url(assets/images/banner/g3.jpg)'}}>
        <div className="container">
          <div className="page-banner-entry">
          {
            calendars.items &&
              calendars.items.map((calendar, index) => (
              <h1 className="text-white">{calendar.title}</h1>
          ))}
          </div>
        </div>
      </div>
      <div className="breadcrumb-row">
        <div className="container">
          <ul className="list-inline">
            <li><a href="#">Home</a></li>
            {
              calendars.items &&
                calendars.items.map((calendar, index) => (
                  <li><Link to="/academic">{calendar.title}</Link></li>
            ))}
            <li> Page {pageNumber} of {numPages}</li>
            <div className="float-right mr-5" style={{verticalAlign:"middle!important"}}>
              <CButton className="btn button-md bg-warning mr-2" disabled={prevBtnDisbaled} onClick={handlePrevPage}><i className="fa fa-arrow-left"></i></CButton>
              <CButton className="btn button-md bg-warning" disabled={nextBtnDisbaled} onClick={handleNextPage}><i className="fa fa-arrow-right"></i></CButton>
            </div>
          </ul>
        </div>
      </div>

      <div className="content-block">
        {/* Philosophy ==== */}
        <div className="section-area bg-gray py-5 text-center our-story">
          <div className="container">
            <div className="row align-items-center d-flex">
              <div className="col-lg-12 col-md-12 heading-bx">
                {
                  calendars.items &&
                      calendars.items.map((calendar, index) => (
                        <div id="row" style={{height: 'auto', display: 'flex', marginBottom:"2%"}} >
                          <div id="placeholderWrapper" style={{ height: 'auto' }} />
                          <div id="pdfWrapper" style={{ width: '90vw' }} ref={pdfWrapper}>
                              <Document
                                file={calendar.calendar_file}
                                onLoadSuccess={onDocumentLoadSuccess}
                                noData="No Calendar Found!"
                                loading={<span className="spinner-border spinner-border-lg mr-1"></span>}
                              >
                                <Page pageNumber={pageNumber} loading={<span className="spinner-border spinner-border-lg mr-1"></span>} width={initialWidth} />
                                <div className="row">
                                  <div className="col-md-6 col-lg-6 col-sm-6 text-right">
                                    <p style={{marginTop: "-5px"}}>Page {pageNumber} of {numPages}</p>
                                  </div>
                                  <div className="col-md-6 col-lg-6 col-sm-6 text-left">
                                    <CButton className="btn button-md bg-warning mr-2" disabled={prevBtnDisbaled} onClick={handlePrevPage}><i className="fa fa-arrow-left"></i></CButton>
                                    <CButton className="btn button-md bg-warning" disabled={nextBtnDisbaled} onClick={handleNextPage}><i className="fa fa-arrow-right"></i></CButton>
                                  </div>
                                </div>
                              </Document>
                            </div>
                        </div>
                      ))
                }

              </div>
            </div>
          </div>
        </div>
      </div>
      
        </div>
    </div>
    
    )
  }

export default Calendar;