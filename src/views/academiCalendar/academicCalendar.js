/**
 * Dynamic page
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { useState, useEffect } from "react";
import PageDataService from "../../_services/PageService";
import { scrollToTop } from "../../_reducers/scroll.reducer"
import { useDispatch, useSelector } from 'react-redux';

import { calendarActions } from '../../_actions/calendar.action';
import {  Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Calendar = () => {

const initialPageState = {
  file : ''
};

const calendars = useSelector(state => state.calendars);
const calendar = useSelector(state => state.calendars.calendar);
const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(calendarActions.getAll());
  scrollToTop();
}, []);

function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages);
}

    return(
      <div className="page-content">
        <div>
        <div className="page-banner ovbl-dark" style={{backgroundImage: 'url(assets/images/banner/g3.jpg)'}}>
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">Academic Calendar</h1>
          </div>
        </div>
      </div>
      <div className="breadcrumb-row">
        <div className="container">
          <ul className="list-inline">
            <li><a href="#">Home</a></li>
            <li>Academic Calendar</li>
          </ul>
        </div>
      </div>

      <div className="content-block">
        {/* Philosophy ==== */}
        <div className="section-area bg-gray section-sp1 our-story">
          <div className="container">
            <div className="row align-items-center d-flex">
              <div className="col-lg-12 col-md-12 heading-bx">
                {
                  calendars.items &&
                      calendars.items.map((calendar, index) => (
                <div className="text-centered">
                <Document
                  file={calendar.calendar_file}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                 {/* {[1,2,3,,4,5,6,7,8,9,10,11,12].map(page => (
            <Page pageNumber={page} />
                ))}
                  <Page pageNumber={pageNumber} /> */}
                  {Array.apply(null, Array(numPages))
                          .map((x, i)=>i+1)
                          .map(page => 
                          <div>
                          <Page pageNumber={page}/>
                          <p>Page {page} of {numPages}</p>
                          </div>
                          
                          )}
                </Document>
               
                </div> 
                ))}

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