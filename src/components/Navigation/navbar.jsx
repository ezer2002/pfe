import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import profil from "../../assets/images/Innovation page.png";
import profil2 from "../../assets/images/Innovation page.png";
import "./navbar.css"

function Navbar() {
    const [Mobile, setMobile] = useState(false);
    const [selected, setSelected] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-items">
        <div
          onClick={() => setMobile(false)}
          className={Mobile ? "nav-links-mobile" : "nav-links "}
        >
          <li class={selected ? "nav-item menu  ":"nav-item selected"}>
            <div class=" profile-pic">
              <li>Schedule</li>
            </div>
          </li>
          <li class="nav-item menu ">
            <div class=" profile-pic">
              <li>List</li>
            </div>
          </li>
        </div>
        <div
          onClick={() => setMobile(false)}
          className={Mobile ? "nav-links-mobile" : "nav-links user"}
        >
          <div className="search-icon">
            <IoSearch size={25} />
          </div>
          <li class="nav-item dropdown">
            <div class=" profile-pic">
              {" "}
              <img src={profil} alt="user-img" class="img-circle" />
              <span>Beya Marzouk</span> <MdOutlineKeyboardArrowDown />
            </div>
            <ul class="dropdown-menu dropdown-user">
              <li>
                <div class="user-box">
                  <div class="u-img">
                    <img src={profil2} alt="user" />
                  </div>
                  <div class="u-text">
                    <h4>Hizrian</h4>
                    <p class="text-muted">hello@themekita.com</p>
                    <a
                      href="profile.html"
                      class="btn btn-rounded btn-danger btn-sm"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </li>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                <i class="ti-user"></i> My Profile
              </a>
              <a class="dropdown-item" href="#">
                {" "}
                My Balance
              </a>
              <a class="dropdown-item" href="#">
                <i class="ti-email"></i> Inbox
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                <i class="ti-settings"></i> Account Setting
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                <i class="fa fa-power-off"></i> Logout
              </a>
            </ul>
          </li>
        </div>
      </div>
      <button
        className="mobile-menu-icon"
        onClick={() => setMobile(!Mobile)}
      >
        {Mobile ? <ImCross /> : <FaBars />}
      </button>
    </nav>
  )
}

export default Navbar