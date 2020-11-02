/**
 * Dynamic page
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Route , withRouter} from 'react-router-dom';
import {apiUrl} from '../../reusable/apiHost';


class Dynamic extends Component {
  constructor(props) {
    super(props)
    this.state = {
        title: '',
        description: '',
        image: ''
    }
  }

// ============= onLoad =================
componentDidMount() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  this.componentDidUpdate();
}

componentDidUpdate() {
  var id = window.location.toString().split('=')[1];
  var myHeaders = new Headers();
  var id = window.location.toString().split('=')[1]
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(apiUrl+"pages/page/"+id, requestOptions)
    .then(response => response.text())
    .then((response) => {
      var obj = JSON.parse(response);
      this.setState({
        title: obj.data.title,
        description: obj.data.description,
        image: obj.data.image,
      })
      console.log(obj.data.title)
    })
    .catch(error => console.log('error', error));
}
  render(){
    return(
      <div className="page-content">
      {/* Page Heading Box ==== */}
      <div className="page-banner ovbl-dark" style={{backgroundImage: 'url(assets/images/banner/g3.jpg)'}}>
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">{this.state.title}</h1>
          </div>
        </div>
      </div>
      <div className="breadcrumb-row">
        <div className="container">
          <ul className="list-inline">
            <li><a href="#">Home</a></li>
            <li>{this.state.title}</li>
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
              <div className="col-lg-8 col-md-12 heading-bx">
                <h2 className="m-b10">{this.state.title}</h2>
                <p style={{textAlign: "justify"}} >{this.state.description}</p>
                {/* <a href="#" className="btn">Read More</a> */}
              </div>
              <div className="col-lg-4 col-md-12 heading-bx p-lr">
                <div className="video-bx">
                  <img src={this.state.image} alt={this.state.title+"_iamge"} />
                </div>
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

export default withRouter(Dynamic);