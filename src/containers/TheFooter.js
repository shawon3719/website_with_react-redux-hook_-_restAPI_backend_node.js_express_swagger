import React from 'react'
import { CFooter } from '@coreui/react'
import { Link } from 'react-router-dom'
function backToTop(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
const TheFooter = () => {
  return (
    <div>
  <footer>
    <div className="footer-top">
      <div className="pt-exebar">
        <div className="container">
          <div className="d-flex align-items-stretch">
            <div className="pt-logo mr-auto">
              <Link to="/">
              {/* <img src="assets/images/kyanc_logo.png" alt /> */}
              <h1>Khwaja Yunus Ali Nursing College</h1>
              </Link>
            </div>
            <div className="pt-social-link">
              <ul className="list-inline m-a0">
                <li><a href="#" className="btn-link"><i className="fa fa-facebook" /></a></li>
                <li><a href="#" className="btn-link"><i className="fa fa-twitter" /></a></li>
                <li><a href="#" className="btn-link"><i className="fa fa-linkedin" /></a></li>
                <li><a href="#" className="btn-link"><i className="fa fa-google-plus" /></a></li>
              </ul>
            </div>
            <div className="pt-btn-join">
              <a href="#" className="btn ">Apply Now</a>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12 footer-col-4">
            <div className="widget">
              <h5 className="footer-title">Address</h5>
              <p className="text-capitalize m-b20">Vill: Enayetpur, P.O: Enayetpur, P.S: Chowhali<br></br>Dist.: Sirajgonj</p>
              <div className="subscribe-form m-b20">
                {/* <form className="subscription-form" action="http://educhamp.themetrades.com/demo/assets/script/mailchamp.php" method="post">
                  <div className="ajax-message" />
                  <div className="input-group">
                    <input name="email" required="required" className="form-control" placeholder="Your Email Address" type="email" />
                    <span className="input-group-btn">
                      <button name="submit" value="Submit" type="submit" className="btn"><i className="fa fa-arrow-right" /></button>
                    </span> 
                  </div>
                </form> */}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 col-md-7 col-sm-12">
            <div className="row">
              <div className="col-6 col-lg-6 col-md-4 col-sm-4">
                <div className="widget footer_widget">
                  <h5 className="footer-title">Contact Us</h5>
                  <ul>
                    <li>Email: info@kyanc.edu.bd
                      <br></br>Mobile: +880 1915 477 962
                      <br></br>Tel: +880 7516 3760-4
                      <br></br>Fax: +880 7516 3853
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-6 col-lg-6 col-md-4 col-sm-4">
                <div className="widget footer_widget">
                  <h5 className="footer-title">Courses</h5>
                  <ul>
                    <li><a href="courses.html">Diploma in Nursing Science & Midwifery</a></li>
                    <li><a href="courses-details.html">Post Basic BSc. in Nursing</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 col-md-5 col-sm-12 footer-col-4">
            <div className="widget widget_gallery gallery-grid-4">
              <h5 className="footer-title">Our Gallery</h5>
              <ul className="magnific-image">
                <li><a href="assets/images/gallery/pic1.jpg" className="magnific-anchor"><img src="assets/images/gallery/pic1.jpg" alt /></a></li>
                <li><a href="assets/images/gallery/pic2.jpg" className="magnific-anchor"><img src="assets/images/gallery/pic2.jpg" alt /></a></li>
                <li><a href="assets/images/gallery/pic3.jpg" className="magnific-anchor"><img src="assets/images/gallery/pic3.jpg" alt /></a></li>
                <li><a href="assets/images/gallery/pic4.jpg" className="magnific-anchor"><img src="assets/images/gallery/pic4.jpg" alt /></a></li>
                <li><a href="assets/images/gallery/pic5.jpg" className="magnific-anchor"><img src="assets/images/gallery/pic5.jpg" alt /></a></li>
                <li><a href="assets/images/gallery/pic6.jpg" className="magnific-anchor"><img src="assets/images/gallery/pic6.jpg" alt /></a></li>
                <li><a href="assets/images/gallery/pic7.jpg" className="magnific-anchor"><img src="assets/images/gallery/pic7.jpg" alt /></a></li>
                <li><a href="assets/images/gallery/pic8.jpg" className="magnific-anchor"><img src="assets/images/gallery/pic8.jpg" alt /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 text-center"> Design & Developed By <a style={{color: "green"}} target="_blank" href="https://www.atilimited.net"><span style={{color:"red"}}>ATI</span> Limited</a></div>
        </div>
      </div>
    </div>
  </footer>
  {/* Footer END ==== */}
  <button onClick={()=>backToTop()} className="back-to-top btn-sm fa fa-chevron-up" />
</div>

  )
}

export default React.memo(TheFooter)
