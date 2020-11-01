import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCarousel,
  CCarouselCaption,
  CCarouselControl,
  CCarouselIndicators,
  CCarouselInner,
  CCarouselItem,
  CCol,
  CRow 
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ParticleComponent from "./ParticleComponent";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./SliderAnimation.css";
import "./SliderStyle.css";

// const slides = [
//   'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
//   'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
// ]

const content = [
  {
    title: "Khwaja Yunus Ali Nursing College",
    description:
      "The Nursing College is recognized by Bangladesh Nursing Council. KYAMCH Nursing College represents the nurses who care for patients at the Hospital.",
      button: "Learn More",
    image: "assets/images/banner/g1.jpg",
    user: "Luan Gjokaj",
    userProfile: "https://i.imgur.com/JSW6mEk.png"
  },
  {
    title: "Khwaja Yunus Ali Nursing College",
    description:
    "The Nursing College is recognized by Bangladesh Nursing Council. KYAMCH Nursing College represents the nurses who care for patients at the Hospital.",
    button: "Learn More",
    image: "assets/images/banner/g2.jpg",
    user: "Erich Behrens",
    userProfile: "https://i.imgur.com/0Clfnu7.png"
  },
  {
    title: "Khwaja Yunus Ali Nursing College",
    description:
    "The Nursing College is recognized by Bangladesh Nursing Council. KYAMCH Nursing College represents the nurses who care for patients at the Hospital.",
    button: "Learn More",
    image: "assets/images/banner/g3.jpg",
    user: "Bruno Vizovskyy",
    userProfile: "https://i.imgur.com/4KeKvtH.png"
  },
  {
    title: "Khwaja Yunus Ali Nursing College",
    description:
    "The Nursing College is recognized by Bangladesh Nursing Council. KYAMCH Nursing College represents the nurses who care for patients at the Hospital.",
    button: "Learn More",
    image: "assets/images/banner/g4.jpg",
    user: "Luan Gjokaj",
    userProfile: "https://i.imgur.com/JSW6mEk.png"
  },
  {
    title: "Khwaja Yunus Ali Nursing College",
    description:
    "The Nursing College is recognized by Bangladesh Nursing Council. KYAMCH Nursing College represents the nurses who care for patients at the Hospital.",
    button: "Learn More",
    image: "assets/images/banner/g5.jpg",
    user: "Erich Behrens",
    userProfile: "https://i.imgur.com/0Clfnu7.png"
  }
];

const Dashboard = () => {
  const [activeIndex] = useState(1)
  return (
    <>
<div className="page-content bg-white">
  {/* Main Slider */}

  {/* <CCarousel animate autoSlide={3000}>
    <CCarouselIndicators/>
      <CCarouselInner>
        <CCarouselItem>
          <img className="d-block w-100" src={'sliders/slide1.JPG'} alt="slide 1"/>
          <CCarouselCaption><h3>Slide 1</h3><p>Slide 1</p></CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <img className="d-block w-100" src={'sliders/slide2.jpg'} alt="slide 2"/>
          <CCarouselCaption><h3>Slide 2</h3><p>Slide 2</p></CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <img className="d-block w-100" src={'sliders/slide3.jpg'} alt="slide 3"/>
          <CCarouselCaption><h3>Slide 3</h3><p>Slide 3</p></CCarouselCaption>
        </CCarouselItem>
      </CCarouselInner>
      <CCarouselControl direction="prev"/>
      <CCarouselControl direction="next"/>
    </CCarousel> */}

    <Slider className="slider-wrapper container-fluid" autoplay={3000}>
      {content.map((item, index) => (
        <div
          key={index}
          className="slider-content"
          style={{ background: `url('${item.image}') no-repeat center center` }}
        >
          <div className="inner">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <button>{item.button}</button>
          </div>
          {/* <section>
            <img src={item.userProfile} alt={item.user} />
            <span>
              Posted by <strong>{item.user}</strong>
            </span>
          </section> */}
        </div>
      ))}
    </Slider>

  {/* Main Slider */}
  <div className="content-block">
    {/* Popular Courses */}
    <div className="section-area section-sp2 popular-courses-bx">
      <div className="container">
        <div className="row">
          {/* <div className="col-md-12 heading-bx left"> */}
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
            {/* <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "200px",
                color: "black"
              }}
            > */}
              <h2 className="title-head">Popular <span>Courses</span></h2>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
          
              {/* You can render <Route> and <NavTabs /> here */}
            {/* </div> */}
          </div>
            {/* </div> */}
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
    {/* Testimonials */}
    {/* <div className="section-area section-sp1 bg-fix ovbl-dark text-white" style={{backgroundImage: 'url(assets/images/background/bg1.jpg)'}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
            <div className="counter-style-1">
              <div className="text-white">
                <span className="counter">3000</span><span>+</span>
              </div>
              <span className="counter-text">Completed Projects</span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
            <div className="counter-style-1">
              <div className="text-white">
                <span className="counter">2500</span><span>+</span>
              </div>
              <span className="counter-text">Happy Clients</span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
            <div className="counter-style-1">
              <div className="text-white">
                <span className="counter">1500</span><span>+</span>
              </div>
              <span className="counter-text">Questions Answered</span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
            <div className="counter-style-1">
              <div className="text-white">
                <span className="counter">1000</span><span>+</span>
              </div>
              <span className="counter-text">Ordered Coffee's</span>
            </div>
          </div>
        </div>
      </div>
    </div>
     */}
    {/* Testimonials END */}
    {/* Testimonials ==== */}
    {/* <div className="section-area section-sp2">
      <div className="container">
        <div className="row">
          <div className="col-md-12 heading-bx left">
            <h2 className="title-head text-uppercase">what people <span>say</span></h2>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
          </div>
        </div>
        <div className="testimonial-carousel owl-carousel owl-btn-1 col-12 p-lr0">
          <div className="item">
            <div className="testimonial-bx">
              <div className="testimonial-thumb">
                <img src="assets/images/testimonials/pic1.jpg" alt />
              </div>
              <div className="testimonial-info">
                <h5 className="name">Peter Packer</h5>
                <p>-Art Director</p>
              </div>
              <div className="testimonial-content">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...</p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="testimonial-bx">
              <div className="testimonial-thumb">
                <img src="assets/images/testimonials/pic2.jpg" alt />
              </div>
              <div className="testimonial-info">
                <h5 className="name">Peter Packer</h5>
                <p>-Art Director</p>
              </div>
              <div className="testimonial-content">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     */}
    {/* Testimonials END ==== */}
  </div>
  {/* contact area END */}
</div>

    
      </>
  )
}

export default Dashboard
