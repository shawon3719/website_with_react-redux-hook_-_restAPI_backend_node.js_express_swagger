/**
 * Courses page
 * React and JSX
 * @version 16.5.2
 * @author [Masudul Hasan Shawon](masudul@atilimited.net)
 * 
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Route , withRouter} from 'react-router-dom';
import Diploma from './Diploma';
import BSc from './BSc';
import './Courses.css'
class Courses extends Component {

    constructor(props) {
        super(props)
        this.state = {
                showDiploma: ''
        }
        this.handleDiploma = this.handleDiploma.bind(this);
        this.handleBSc = this.handleBSc.bind(this);
      
      }

    handleDiploma(){
        this.setState({
            showDiploma: true
        });
        window.scrollTo({
          top: 400,
          behavior: 'smooth',
        });
    }

    handleBSc(){
        this.setState({
            showDiploma: false
        });
        window.scrollTo({
          top: 400,
          behavior: 'smooth',
        });
    }
    componentDidMount() {
        this.setState({
            showDiploma: true
        })
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
  render(){
    return(
        <div className="page-content bg-white">
  {/* inner page banner */}
  <div className="page-banner ovbl-dark" style={{backgroundImage: 'url(assets/images/banner/g2.jpg)'}}>
    <div className="container">
      <div className="page-banner-entry">
        <h1 className="text-white">Courses Details of {this.state.showDiploma == true ? 'Diploma' : 'BSc'}</h1>
      </div>
    </div>
  </div>
  {/* Breadcrumb row */}
  <div className="breadcrumb-row">
    <div className="container">
      <ul className="list-inline">
        <li><Link to="/">Home</Link></li>
        <li>Courses Details</li>
        <li>{this.state.showDiploma == true ? 'Diploma in Nursing Science & Midwifery' : 'Post Basic BSc. in Nursing'}</li>
      </ul>
    </div>
  </div>
  {/* Breadcrumb row END */}
  {/* inner page banner END */}
  <div className="content-block">
    {/* About Us */}
    <div className="section-area section-sp1">
      <div className="container-fluid">
        <div className="row d-flex flex-row-reverse">
          <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
            <div className="course-detail-bx">
              {/* <div className="course-price" style={{backgroundImage: 'url(assets/images/banner/g2.jpg)', backgroundSize: "400px"}}>
                <del>$190</del>
                <h4 className="price">$120</h4>
              </div>	 */}
              {/* <div className="course-buy-now text-center">
                <a href="#" className="btn radius-xl text-uppercase">Buy Now This Courses</a>
              </div> */}
              <div className="teacher-bx">
                <div className="teacher-info">
                  <div className="teacher-thumb">
                    <img src="assets/images/kyanc_logo.png" alt />
                  </div>
                  <div className="teacher-name">
                    <h5>KYANC</h5>
                    <span>Rising Above Self</span>
                  </div>
                </div>
              </div>
              {/* <div className="cours-more-info">
                <div className="review">
                  <span>3 Review</span>
                  <ul className="cours-star">
                    <li className="active"><i className="fa fa-star" /></li>
                    <li className="active"><i className="fa fa-star" /></li>
                    <li className="active"><i className="fa fa-star" /></li>
                    <li><i className="fa fa-star" /></li>
                    <li><i className="fa fa-star" /></li>
                  </ul>
                </div>
                <div className="price categories">
                  <span>Categories</span>
                  <h5 className="text-primary">Frontend</h5>
                </div>
              </div> */}
              <div className="course-info-list scroll-page">
                <ul className="navbar">
                  <li><a type="button" className={this.state.showDiploma == true ? 'nav-link active' : 'nav-link'}  onClick={() => this.handleDiploma()}><i className="fa fa-graduation-cap" />Diploma in Nursing</a></li>
                  <li><a type="button" className={this.state.showDiploma == false ? 'nav-link active' : 'nav-link'} onClick={() => this.handleBSc()}><i className="fa fa-graduation-cap" />Post Basic BSc. in Nursing</a></li>
                  <li><Link style={{color: "#3c4b64"}} className="nav-link" to="/fees-and-charges"><i className="fa fa-money" style={{color: "#3c4b64"}} />Fees & Charges</Link></li>
                  <li><a className="nav-link" href="#reviews"><i className="fa fa-paper-plane" />Apply Now</a></li>
                </ul>
              </div>
            </div>
          </div>
       <>
       {
          this.state.showDiploma == true ?
          <Diploma/>
          :
          <BSc/>
       }
       </>
        </div>
      </div>
    </div>
  </div>
  {/* contact area END */}
</div>

    
    )
  }
  
}

export default withRouter(Courses);