import React from 'react'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCarousel,
//   CCarouselCaption,
//   CCarouselControl,
//   CCarouselIndicators,
//   CCarouselInner,
//   CCarouselItem,
//   CCol,
//   CRow 
// } from '@coreui/react'
// import { DocsLink } from 'src/reusable'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ParticleComponent from "./ParticleComponent";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./SliderAnimation.css";
import "./SliderStyle.css";
import {apiUrl} from '../../reusable/apiHost';


const content = [
  {
    title: "Khwaja Yunus Ali Nursing College",
    description:
      "The Nursing College is recognized by Bangladesh Nursing Council. KYAMCH Nursing College represents the nurses who care for patients at the Hospital.",
      button: "Learn More",
    image: "assets/images/banner/g1.jpg"
  },
  {
    title: "Khwaja Yunus Ali Nursing College",
    description:
    "The Nursing College is recognized by Bangladesh Nursing Council. KYAMCH Nursing College represents the nurses who care for patients at the Hospital.",
    button: "Learn More",
    image: "assets/images/banner/g2.jpg"
  },
  {
    title: "Khwaja Yunus Ali Nursing College",
    description:
    "The Nursing College is recognized by Bangladesh Nursing Council. KYAMCH Nursing College represents the nurses who care for patients at the Hospital.",
    button: "Learn More",
    image: "assets/images/banner/g3.jpg"
  },
  {
    title: "Khwaja Yunus Ali Nursing College",
    description:
    "The Nursing College is recognized by Bangladesh Nursing Council. KYAMCH Nursing College represents the nurses who care for patients at the Hospital.",
    button: "Learn More",
    image: "assets/images/banner/g4.jpg"
  },
  {
    title: "Khwaja Yunus Ali Nursing College",
    description:
    "The Nursing College is recognized by Bangladesh Nursing Council. KYAMCH Nursing College represents the nurses who care for patients at the Hospital.",
    button: "Learn More",
    image: "assets/images/banner/g5.jpg"
  }
];
// const [activeIndex] = useState(1);
const token = localStorage.getItem('x-auth-token');

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        sliders: []
    }
  }
  componentDidMount(){
    var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer "+token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(apiUrl+"sliders/all", requestOptions)
    .then(response => response.text())
    .then((response) => {
        var obj = JSON.parse(response);
        this.setState({
            sliders: obj.data
        })
        console.log(obj.data)
    })
    .catch(error => console.log('error', error));
  }


  render () {
   
  return (
    <div className="page-content bg-white">
        <Slider className="slider-wrapper container-fluid" autoplay={3000}>
          {this.state.sliders.map((item, index) => (
            <div
              key={index}
              className="slider-content"
              style={{ background: `url('${item.image}') no-repeat center center` }}
            >
              <div className="inner">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <button>Learn More</button>
              </div>
            </div>
          ))}
        </Slider>
        {/*End Main Slider */}
        <div className="content-block">
          {/* Popular Courses */}
          <div className="section-area section-sp2 popular-courses-bx">
            <div className="container">
              <div className="row">
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "200px",
                    color: "green"
                  }}
                >
                  <ParticleComponent />
                  <h2 className="title-head">Popular <span>Courses</span></h2>
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
                
                </div>
              </div>
              <div className="row">
                <div className="courses-carousel owl-carousel owl-btn-1 col-12 p-lr0">
                  <div className="item">
                    <div className="cours-bx">
                      <div className="action-box">
                        <img src="%PUBLIC_URL%/assets/images/courses/pic1.jpg" alt />
                        <a href="#" className="btn">Read More</a>
                      </div>
                      <div className="info-bx text-center">
                        <h5><a href="#">Introduction EduChamp – LMS plugin</a></h5>
                        <span>Programming</span>
                      </div>
                      <div className="cours-more-info">
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
                        <div className="price">
                          <del>$190</del>
                          <h5>$120</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="cours-bx">
                      <div className="action-box">
                        <img src="%PUBLIC_URL%/assets/images/courses/pic2.jpg" alt />
                        <a href="#" className="btn">Read More</a>
                      </div>
                      <div className="info-bx text-center">
                        <h5><a href="#">Introduction EduChamp – LMS plugin</a></h5>
                        <span>Programming</span>
                      </div>
                      <div className="cours-more-info">
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
                        <div className="price">
                          <del>$190</del>
                          <h5>$120</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="cours-bx">
                      <div className="action-box">
                        <img src="%PUBLIC_URL%/assets/images/courses/pic3.jpg" alt />
                        <a href="#" className="btn">Read More</a>
                      </div>
                      <div className="info-bx text-center">
                        <h5><a href="#">Introduction EduChamp – LMS plugin</a></h5>
                        <span>Programming</span>
                      </div>
                      <div className="cours-more-info">
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
                        <div className="price">
                          <del>$190</del>
                          <h5>$120</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="cours-bx">
                      <div className="action-box">
                        <img src="%PUBLIC_URL%/assets/images/courses/pic4.jpg" alt />
                        <a href="#" className="btn">Read More</a>
                      </div>
                      <div className="info-bx text-center">
                        <h5><a href="#">Introduction EduChamp – LMS plugin</a></h5>
                        <span>Programming</span>
                      </div>
                      <div className="cours-more-info">
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
                        <div className="price">
                          <del>$190</del>
                          <h5>$120</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Popular Courses END */}
          <div className="section-area section-sp2 bg-fix ovbl-dark join-bx text-center" style={{backgroundImage: 'url(assets/images/background/bg3.jpg)'}}>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="join-content-bx text-white">
                    <h2>Rising Above Self</h2>
                    {/* <h4><span className="counter">57,000</span> Online Courses</h4> */}
                    <p>Khwaja Yunus Ali Nursing College Trust began its mission of elevating the dignity and up lifting the status of rural people through education and health service.Nursing Institute is an enterprise of KYAMCH Truest, and attached with Khwaja Yunus Ali Medical College and Hospital, which is a most modern multidisciplinary tertiary level hospital. The hospital provides world class treatment specially in oncology, cardiology and neurosurgery with affordable cost.</p>
                    <a href="#" className="btn button-md text-warning">Join Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Form END */}
          <div className="section-area section-sp1">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 m-b30">
                  <h2 className="title-head ">Build your nursing skill<br /> <span className="text-primary"> on your time</span></h2>
                  <h4><span className="counter">WE</span> have Both Diploma and BSc. Courses</h4>
                  <p>The curriculum is dynamic with provision for incorporating emerging health problems and changing health policies as well as latest advancement in health sciences.</p>
                  <a href="#" className="btn button-md">Join Now</a>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                      <div className="feature-container">
                        <div className="feature-md text-white m-b20">
                          <a href="#" className="icon-cell"><img src="assets/images/icon/icon1.png" alt /></a> 
                        </div>
                        <div className="icon-content">
                          <h5 className="ttr-tilte">Outcome of Courses</h5>
                          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                      <div className="feature-container">
                        <div className="feature-md text-white m-b20">
                          <a href="#" className="icon-cell"><img src="assets/images/icon/icon2.png" alt /></a> 
                        </div>
                        <div className="icon-content">
                          <h5 className="ttr-tilte">Message from the Principal</h5>
                          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                      <div className="feature-container">
                        <div className="feature-md text-white m-b20">
                          <a href="#" className="icon-cell"><img src="assets/images/icon/icon3.png" alt /></a> 
                        </div>
                        <div className="icon-content">
                          <h5 className="ttr-tilte">Key Of Success</h5>
                          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                      <div className="feature-container">
                        <div className="feature-md text-white m-b20">
                          <a href="#" className="icon-cell"><img src="assets/images/icon/icon4.png" alt /></a> 
                        </div>
                        <div className="icon-content">
                          <h5 className="ttr-tilte">Our Philosophy</h5>
                          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* contact area END */}
    </div>
  )}
}

export default Dashboard
