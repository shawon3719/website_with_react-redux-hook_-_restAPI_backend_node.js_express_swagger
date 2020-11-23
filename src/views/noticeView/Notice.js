/**
 * Dynamic notice
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { useState, useEffect } from "react";
// import NoticeDataService from "../../_services/NoticeService";
import { scrollToTop } from "../../_reducers/scroll.reducer"
import { noticeActions } from "src/_actions";
import { useDispatch, useSelector } from 'react-redux';

const noticeNo = window.location.toString().split('=')[1]
const NoticeView = noticeNo => {

const initialNoticeState = {
  id: window.location.toString().split('=')[1],
  title       : '',
  description : '',
  image : ''
};

const [currentNotice, setCurrentNotice] = useState(initialNoticeState);
const Notice =  useSelector(state => state.notices.currentNotice);
const dispatch = useDispatch();

useEffect(() => {
  let noticeId = window.location.toString().split('=')[1]
  const Notice = parseInt(noticeId);
  dispatch(noticeActions.getById(Notice));
  scrollToTop();
}, [noticeNo]);

    return(
      <div className="notice-content">
      { Notice ? (
        <div>
        <div className="page-banner ovbl-dark" style={{backgroundImage: 'url(assets/images/banner/g3.jpg)'}}>
        <div className="container">
          <div className="page-banner-entry">
          {
            Notice &&
            Notice.map((notice, index) => (
            <h1 className="text-white">{notice.title}</h1>
            ))}
          </div>
        </div>
      </div>
      <div className="breadcrumb-row">
        <div className="container">
          <ul className="list-inline">
            <li><a href="#">Home</a></li>
            {
            Notice &&
            Notice.map((notice, index) => (
              <li>{notice.title}</li>
            ))}
            
          </ul>
        </div>
      </div>

      <div className="content-block">
        {/* Philosophy ==== */}
        <div className="section-area bg-gray section-sp1 our-story">
          <div className="container">
            <div className="row align-items-center d-flex">
            {
            Notice &&
            Notice.map((notice, index) => (
              <div className="col-lg-8 col-md-12 heading-bx">
                <h2 className="m-b10">{notice.title}</h2>
                {/* <p  >{notice.description}</p> */}
                <p style={{textAlign: "justify"}} dangerouslySetInnerHTML={{ __html: notice.description }} />
                
                {/* <a href="#" className="btn">Read More</a> */}
              </div>
            ))}
            
              
              <div className="col-lg-4 col-md-12 heading-bx p-lr">
                <div className="video-bx">
                {
            Notice &&
            Notice.map((notice, index) => (
                  <img src={notice.image} alt={notice.title+"_image"} />
            ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
        </div>
      ) : 
      (
        <div className="pt-3 text-center">
           <div className="spinner-border spinner-border-lg mr-1" />
        </div>
        
      )
      }
    </div>
    
    )
  }

export default NoticeView;