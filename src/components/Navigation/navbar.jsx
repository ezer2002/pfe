import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import profil from "../../assets/images/profil.jpg";

import "../../styles/navbar.css";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../reducers/actionTypes";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";

function Navbar({home}) {
  const [Mobile, setMobile] = useState(false);
  const [selected, setSelected] = useState(false);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((data) => data.user);

  const handleClick = () => {
    console.log("click");
    setClicked(!clicked);
  };
  const navigatetohome =()=>{
    navigate('/calendar')}
  const logout = () => {
    dispatch({
      type: actionTypes.logout_SUCCESS,
      user: null,
    });

    console.log("userdatau", userData);
  };

  return (
    <nav className="navbar">
  

      <div className="navbar-items">
   {  home&& <div className="retour-home">
        <SlCalender size={20} color="black" onClick={navigatetohome} style={{cursor:"pointer"}} />

        </div>}
        <div
          onClick={() => setMobile(false)}
          className={Mobile ? "nav-links-mobile" : "nav-links "}
        ></div>
      
        <div
          onClick={() => setMobile(false)}
          className={Mobile ? "nav-links-mobile" : "nav-links user"}
        >
          {/* <div className="search-icon">
            <IoSearch size={25} />
          </div> */}
          <li
            class="nav-item dropdown"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <div class=" profile-pic">
              {" "}
              <img src={profil} alt="user-img" class="img-circle" />
              <span>Ezer Abrougui</span> <MdOutlineKeyboardArrowDown />
            </div>
            <ul
              class={clicked ? "dropdown-menu dropdown-user" : "dropdown-menu "}
            >
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" onClick={logout}>
                <i class="fa fa-power-off"></i> Logout
              </a>
            </ul>
          </li>
        </div>
      </div>
      <button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
        {Mobile ? <ImCross /> : <FaBars />}
      </button>
    </nav>
  );
}

export default Navbar;
