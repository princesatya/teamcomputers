import React, { useEffect } from "react";
import "../../../assets/css/footer.css"
import teamfooterlogo from "../../../assets/img/teamfooterlogo.png";
import { FaMapMarkerAlt, FaAddressCard, FaPhoneVolume, FaEnvelope, FaAngleDoubleRight, FaFacebookSquare, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

const Footer = ({ urlKey }) => {

  const { categories, storeconfig } = useSelector(
    (state) => state.home
  );
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <footer className="main-footer">
        {/* <!-- Main block - menus, subscribe form--> */}
        <div className="py-5 text-muted">
          <div className="container d-none d-lg-block">
            <div className="row">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="mb-3"><img src={teamfooterlogo} /></div>
                <ul className="contactInfo text-decoration-mail-footer">
                  <li><i className="fas fa-map-marker-alt"><FaMapMarkerAlt /></i> No.1, Mohammadpur, Bhikaji Cama Place New Delhi – 110066, India</li>
                  <li><i className="fas fa-address-card"><FaAddressCard /></i> CIN: U74899DL1987PTC028384</li>
                  <li><i className="fas fa-phone-volume"><FaPhoneVolume /></i> {storeconfig.support_phone}</li>
                  <li><i className="fas fa-envelope"><FaEnvelope /></i> <a href="mailto:customercare@teamcomputers.com"> {storeconfig.support_email}</a></li>
                </ul>

                <h6 className="mb-3">Stay in Touch</h6>
                <ul className="list-inline">
                  <li className="list-inline-item" ><a className="text-muted text-primary-hover" href="https://www.facebook.com/ConnectwithTeam" target="_blank" title="facebook"><i className="fab fa-facebook"><FaFacebookSquare /></i></a></li>
                  <li className="list-inline-item"><a className="text-muted text-primary-hover" href="#" target="_blank" title="twitter"><i className="fab fa-twitter"></i><FaTwitter /></a></li>
                  <li className="list-inline-item"><a className="text-muted text-primary-hover" href="https://www.instagram.com/teamcomputers/" target="_blank" title="instagram"><i className="fab fa-instagram"></i><FaInstagram /></a></li>
                  <li className="list-inline-item"><a className="text-muted text-primary-hover" href="https://www.linkedin.com/company/team-computers/" target="_blank" title="linkedin"><i className="fab fa-linkedin"></i><FaLinkedin /></a></li>
                  <li className="list-inline-item"><a className="text-muted text-primary-hover" href="https://www.youtube.com/user/TeamComputersChannel" target="_blank" title="youtube"><i className="fab fa-youtube"></i><FaYoutube /></a></li>

                </ul>
              </div>

              <div className="col-lg-8 mb-5 mb-lg-0 text-decoration-footer-list">
                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                    <h6 className="mb-3">Products</h6>
                    <ul className="list-unstyled">
                      {categories && categories.map((category, index) =>
                        <li key={index}><span className="footer-right-icon"><FaAngleDoubleRight /></span> <a href={category.name == "Watch" ? "/#/category-list/" + category.url_key : "/#/product-list/" + category.url_key}>{category.name}</a></li>
                      )}
                      {/* <li><span className="footer-right-icon"><FaAngleDoubleRight/></span> <a href={"/#/product-list/" + urlKey}>iPad</a></li>
                      <li><span className="footer-right-icon"><FaAngleDoubleRight/></span> <a href={"/#/product-list/" + urlKey}>iPhone</a></li>
                      <li><span className="footer-right-icon"><FaAngleDoubleRight/></span> <a href={"/#/product-list/" + urlKey}>Watch</a></li>
                      <li><span className="footer-right-icon"><FaAngleDoubleRight/></span> <a href={"/#/product-list/" + urlKey}>AirPods</a></li>
                      <li><span className="footer-right-icon"><FaAngleDoubleRight/></span> <a href={"/#/product-list/" + urlKey}>AirTag</a></li>
                      <li><span className="footer-right-icon"><FaAngleDoubleRight/></span> <a href={"/#/product-list/" + urlKey}>Applye TV</a></li>
                      <li><span className="footer-right-icon"><FaAngleDoubleRight/></span> <a href={"/#/product-list/" + urlKey}>HomePod Mini</a></li>
                      <li><span className="footer-right-icon"><FaAngleDoubleRight/></span> <a href={"/#/product-list/" + urlKey}>Accessories</a></li>
                      <li><span className="footer-right-icon"><FaAngleDoubleRight/></span> <a href={"/#/product-list/" + urlKey}>Apple Gift Card</a></li> */}
                    </ul>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                    <h6 className="mb-3">Service & Support</h6>
                    <ul className="list-unstyled">
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}><span className="footer-right-icon" ><FaAngleDoubleRight /></span> <a href="/#/content/shipping-policy">Shipping Policy</a></li>
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}><span className="footer-right-icon"><FaAngleDoubleRight /></span> <a href="/#/content/privacy-policy">Privacy Policy</a></li>
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}><span className="footer-right-icon"><FaAngleDoubleRight /></span> <a href="/#/content/disclaimer">Disclaimer</a></li>
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}><span className="footer-right-icon"><FaAngleDoubleRight /></span> <a href="/#/content/terms-of-use">Terms of Use</a></li>
                    </ul>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                    <h6 className="mb-3">About</h6>
                    <ul className="list-unstyled">
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}><span className="footer-right-icon" ><FaAngleDoubleRight /></span> <a href="/#/content/about-us">About Us</a></li>
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}><span className="footer-right-icon" ><FaAngleDoubleRight /></span> <a href="/#/blog">Blog</a></li>
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}><span className="footer-right-icon" ><FaAngleDoubleRight /></span> <a href="/#/contact-us">Contact Us</a></li>
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}><span className="footer-right-icon" ><FaAngleDoubleRight /></span> <a href="/#/faqs">FAQs</a></li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="d-lg-none">
            <div className="accordion" id="myAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne">Get In Touch</button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#myAccordion">
                  <div className="card-body">
                    <div className="mb-3"><img src={teamfooterlogo} /></div>
                    <ul className="contactInfo">
                      <li><i className="fas fa-map-marker-alt"><FaMapMarkerAlt /></i> No.1, Mohammadpur, Bhikaji Cama Place New Delhi – 110066, India</li>
                      <li><i className="fas fa-address-card"><FaAddressCard /></i> CIN: U74899DL1987PTC028384</li>
                      <li><i className="fas fa-phone-volume"><FaPhoneVolume /></i> {storeconfig.support_phone}</li>
                      <li><i className="fas fa-envelope"><FaEnvelope /></i> <a href="mailto:customercare@teamcomputers.com">{storeconfig.support_email}</a></li>
                    </ul>

                    <h6 className="mb-3">Stay in Touch</h6>
                    <ul className="list-inline">
                      <li className="list-inline-item"><a className="text-muted text-primary-hover" href="https://www.facebook.com/ConnectwithTeam" target="_blank" title="facebook"><i className="fab fa-facebook"><FaFacebookSquare /></i></a></li>
                      <li className="list-inline-item"><a className="text-muted text-primary-hover" href="#" target="_blank" title="twitter"><i className="fab fa-twitter"><FaTwitter /></i></a></li>
                      <li className="list-inline-item"><a className="text-muted text-primary-hover" href="https://www.instagram.com/teamcomputers/" target="_blank" title="instagram"><i className="fab fa-instagram"><FaInstagram /></i></a></li>
                      <li className="list-inline-item"><a className="text-muted text-primary-hover" href="https://www.linkedin.com/company/team-computers/" target="_blank" title="linkedin"><i className="fab fa-linkedin"><FaLinkedin /></i></a></li>
                      <li className="list-inline-item"><a className="text-muted text-primary-hover" href="https://www.youtube.com/user/TeamComputersChannel" target="_blank" title="youtube"><i className="fab fa-youtube"><FaYoutube /></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo">Products</button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#myAccordion">
                  <div className="card-body">
                    <ul className="list-unstyled">
                      {categories && categories.map((category, index) =>
                        <li key={index}><span className="footer-right-icon"><FaAngleDoubleRight /></span> <a href={category.name == "Watch" ? "/#/category-list/" + category.url_key : "/#/product-list/" + category.url_key}>{category.name}</a></li>
                      )}

                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree">Service & Support</button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#myAccordion">
                  <div className="card-body">
                    <ul className="list-unstyled">

                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}><span className="footer-right-icon" ><FaAngleDoubleRight /></span> <a href="/#/content/shipping-policy">Shipping Policy</a></li>
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}><span className="footer-right-icon" ><FaAngleDoubleRight /></span> <a href="/#/content/privacy-policy">Privacy Policy</a></li>
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}> <span className="footer-right-icon" ><FaAngleDoubleRight /></span><a href="/#/content/disclaimer">Disclaimer</a></li>
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}> <span className="footer-right-icon" ><FaAngleDoubleRight /></span><a href="/#/content/terms-of-use">Terms of Use</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour">About</button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#myAccordion">
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}><span className="footer-right-icon" ><FaAngleDoubleRight /></span> <a href="/#/content/about-us" >About Us</a></li>
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}> <span className="footer-right-icon" ><FaAngleDoubleRight /></span> <a href="/#/blog">Blog</a></li>
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}> <span className="footer-right-icon" ><FaAngleDoubleRight /></span><a href="/#/contact-us">Contact Us</a></li>
                      <li onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}><span className="footer-right-icon" ><FaAngleDoubleRight /></span> <a href="/#/faqs">FAQs</a></li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* <!-- Copyright section of the footer--> */}
        <div className="footerbottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start">
                <p className="mb-md-0"> Team Computers Pvt. Ltd. &copy; 2022 | All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer;