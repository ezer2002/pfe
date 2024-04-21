import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io5";
import logo from "../../assets/images/Innovation page.png";
import { SlCalender } from "react-icons/sl";
import "./sidebar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [Mobile, setMobile] = useState(false);
  const [selected, setSelected] = useState(false);
  const toggleSelected = () => {
    setSelected(!selected);
  };
    
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
  return (
    <>    
      <aside id="sidebar" className="sidebar-tow">
        <div className="sidebar-header-tow">
          <img src={logo}></img>
        </div>

        <ul class="sidebar-nav">
          <li class="sidebar-item">
            <div href="#" class="sidebar-link ">
              <div className="icon-cal">
                <SlCalender size={20} color="white" />
              </div>
            </div>
          </li>
        </ul>
        <div class="sidebar-footer">
          <a href="#" class="sidebar-link">
            <i class="lni lni-exit"></i>
            <span>Logout</span>
          </a>
        </div>
      </aside>
      
      <aside id="sidebar" className={expanded ? "expand" : ""}>
        <div className="sidebar-header">
          <div class="sidebar-logo">
            <a href="#">diggow</a>
          </div>
          <button class="toggle-btn" type="button" onClick={toggleSidebar}>
            <FaArrowLeft />
          </button>
        </div>
        <ul class="sidebar-nav">
          <li class="sidebar-item">
            <a
              href="#"
              class="sidebar-link collapsed has-dropdown"
              data-bs-toggle="collapse"
              data-bs-target="#fb"
              aria-expanded="false"
              aria-controls="fb"
            >
              <FaSquareFacebook size={20} color="blue" />

              <span>Facebook</span>
            </a>
            <ul
              id="fb"
              class="sidebar-dropdown list-unstyled collapse"
              data-bs-parent="#sidebar"
            >
              <li class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <span className="icon-mini-menu">G</span>
                  Géant Tunisie
                </a>
              </li>
              <li class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <span className="icon-mini-menu">M</span>
                  Monoprix
                </a>
              </li>
              <li class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <span className="icon-mini-menu">C</span>
                  Carrefour
                </a>
              </li>
              <li class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <span className="icon-mini-menu">F</span>
                  Fnac Tunisie
                </a>
              </li>
            </ul>
          </li>

          <li class="sidebar-item">
            <a
              href="#"
              class="sidebar-link collapsed has-dropdown"
              data-bs-toggle="collapse"
              data-bs-target="#auth"
              aria-expanded="false"
              aria-controls="auth"
            >
              <BsInstagram size={20} />
              <span>Instagram</span>
            </a>
            <ul
              id="auth"
              class="sidebar-dropdown list-unstyled collapse"
              data-bs-parent="#sidebar"
            >
              <li class="sidebar-item">
                <a href="#" class="sidebar-link">
                  Page1
                </a>
              </li>
              <li class="sidebar-item">
                <a href="#" class="sidebar-link">
                  Register
                </a>
              </li>
            </ul>
          </li>
          <li class="sidebar-item">
            <a
              href="#"
              class="sidebar-link collapsed has-dropdown"
              data-bs-toggle="collapse"
              data-bs-target="#multi"
              aria-expanded="false"
              aria-controls="multi"
            >
              <IoLogoLinkedin size={20} color="blue" />
              <span>Linkedin</span>
            </a>
            <ul
              id="multi"
              class="sidebar-dropdown list-unstyled collapse"
              data-bs-parent="#sidebar"
            >
            
            </ul>
          </li>
        </ul>
        <div class="sidebar-footer">
          <a href="#" class="sidebar-link">
            <i class="lni lni-exit"></i>
            <span>Logout</span>
          </a>
        </div>
      </aside>
  </>
 )
}

export default Sidebar