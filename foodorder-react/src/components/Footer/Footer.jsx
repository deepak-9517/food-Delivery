import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div
      className="footer col-md-12 bg-dark text-white p-5"
      style={{ marginTop: "10rem" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 footer-left">
            <img src={assets.logo} alt="" />
            <p className="mt-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
              consequatur incidunt voluptates, explicabo quibusdam odio Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Neque
              consequatur incidunt voluptates, explicabo quibusdam odio
            </p>
            <p className="mt-4">
              <img src={assets.twitter_icon} alt="" className="me-3" />
              <img src={assets.facebook_icon} alt="" className="me-3" />
              <img src={assets.linkedin_icon} alt="" className="me-3" />
            </p>
          </div>
          <div className="col-md-3 footer-center ps-4">
            <h2>Company</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="col-md-3 footer-right">
            <h2>GET IN TOUCH</h2>
            <p>+1-565-48-4665</p>
            <p>contact@tomato.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
