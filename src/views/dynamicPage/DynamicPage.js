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
import {customUrl} from "src/reusable/apiHost"
 
const pageNo = window.location.toString().split('=')[1]
const Dynamic = pageNo => {

const initialPageState = {
  id: window.location.toString().split('=')[1],
  title       : '',
  description : '',
  image : ''
};

const [currentPage, setCurrentPage] = useState(initialPageState);
const [Pages, setPages] = useState([]);

useEffect(() => {
  let id = window.location.toString().split('=')[1]
  getPage(id);
  scrollToTop();
}, [pageNo]);

const getPage = id => {
  PageDataService.get(id)
    .then(response => {
        var obj = JSON.stringify(response.data.data);
        console.log(response.data);
      setCurrentPage(response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
};

    return(
      <div className="page-content">
      { currentPage ? (
        <div>
        <div className="page-banner ovbl-dark" style={{backgroundImage: 'url(assets/images/banner/g3.jpg)'}}>
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">{currentPage.title}</h1>
          </div>
        </div>
      </div>
      <div className="breadcrumb-row">
        <div className="container">
          <ul className="list-inline">
            <li><a href="#">Home</a></li>
            <li>{currentPage.title}</li>
          </ul>
        </div>
      </div>

      <div className="content-block">
        {/* Philosophy ==== */}
        <div className="section-area bg-gray section-sp1 our-story">
          <div className="container">
            <div className="row align-items-center d-flex">
              <div className="col-lg-8 col-md-12 heading-bx">
                <h2 className="m-b10">{currentPage.title}</h2>
                <p style={{textAlign: "justify"}} >{currentPage.description}</p>
                {/* <a href="#" className="btn">Read More</a> */}
              </div>
              <div className="col-lg-4 col-md-12 heading-bx p-lr">
                <div className="video-bx">
                  <img src={customUrl+currentPage.image} alt={currentPage.title+"_iamge"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
        </div>
      ) : 
      (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )
      }
    </div>
    
    )
  }

export default Dynamic;