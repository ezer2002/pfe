import React, { useState, useEffect,useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io5";
import logo from "../../assets/images/diggow.jpg";
import { SlCalender } from "react-icons/sl";
import "../../styles/sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import DeclarativeDemo from "../deletedialog";
import ConfirmModal from "./modal";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const userData = useSelector((data) => data.user);

  const [expanded, setExpanded] = useState(false);
  //const [Mobile, setMobile] = useState(false);
  const [selected, setSelected] = useState(false);
  const [pages, setPages] = useState([]);
  const toggleSelected = () => {
    setSelected(!selected);
  };
  const [nompage, setNomPage] = useState("");
  const [pageId, setPageId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  const [showpopup, setshowpopup] = useState(false);

  const togglePopup = () => {
    setshowpopup(!showpopup);
  };
  const add = async () => {
    if (
      //nompage.trim() == "" ||
      pageId.trim() == "" ||
      accessToken.trim() == ""
    ) {
      toast.error("verifier vos données .");
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/addpagesociaux",
          {
            //page_name: nompage,
            page_id: pageId,

            access_token: accessToken,
            user_id: userData,
          }
        );

        console.log(userData);
        setshowpopup(false);
      } catch (err) {
        toast.error("Please verify your data.");
        console.log("err");
      }
      get();
    }
  };

  const get = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/getUserPages",
        {
          params: {
            user_id: userData,
          },
        }
      );
      setPages(response.data);
      console.log("page", response.data);
    } catch (err) {
      console.log("err");
    }
  };
  useEffect(() => {
    get();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedpage, setdeletedpage] = useState("");

  const handleOpenModal = (id) => {
    setdeletedpage(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const clicke = (id) => {
  
  };
  useEffect(() => {

    document.addEventListener("click", clicke);
    return () => {
      document.removeEventListener("click", clicke);
    };
  }, []);
  const deletethepage = (id) => {
    console.log(id);
    axios
      .post(`http://127.0.0.1:8000/api/pages/${id}/delete`)
      .then((response) => {
        console.log(response.data.message);
        get();
        toast.success("page deleted successfully.");
        setIsModalOpen(false);
        
      })

      .catch((error) => {
        toast.error("Error deleting page existing post for this page");
        console.error("Error deleting page:", error);
        setIsModalOpen(false);
      });
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
              class="sidebar-link collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#add"
              aria-expanded="false"
              aria-controls="add"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setshowpopup(true)}
            >
              {/* 
                  <span className="icon-mini-menu ">A</span> */}

              <IoIosAddCircleOutline size={20} />
              <span> Add a page </span>
            </a>
          </li>
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
              {pages.map((page) => (
                <li key={page.id} className="sidebar-item">
                  <a href="#" className="sidebar-link page-name">
                    {/* <span className="icon-mini-menu">
                      {page.page_name.charAt(0)}
                    </span> */}
                    <div className="name">{page.page_name}</div>

                    {/* <div className="delete-page">
                      <ConfirmModal
                        isOpen={isModalOpen}
                        message="Are you sure you want to proceed?"
                        onConfirm={() => }
                        onCancel={handleCloseModal}
                      />
                    </div> */}
                    <MdOutlineDeleteOutline
                      onClick={() => handleOpenModal(page.id)}
                      size={20}
                      className="ms-5"
                      cursor={"pointer"}
                    />
                  </a>
                </li>
              ))}
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
            ></ul>
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
            ></ul>
          </li>
        </ul>
        
        {showpopup && (
          <div className="popuppage">
            <div className="popup-content">
              <button className="close-button" onClick={togglePopup}>
                ×
              </button>

              <div className="input-page-list">
                <div className="pages-input">
                  <div>
                    {" "}
                    <label name="email">Page id</label>
                  </div>
                  <div>
                    {" "}
                    <input
                      type="text"
                      onChange={(event) => setPageId(event.target.value)}
                    />
                  </div>
                </div>
                <div className="page-input">
                  <label name="email">Access token</label>
                  <input
                    type="text"
                    onChange={(event) => setAccessToken(event.target.value)}
                  />
                </div>
                <div className="ajouter-button">
                  <button onClick={add}>Add</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
      {isModalOpen && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={handleCloseModal}>
              ×
            </button>
            <div>
              <h5>Are you sure you want to proceed?</h5>

              <div
                style={{
                  margin: "8px",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <button
                  onClick={() => deletethepage(deletedpage)}
                  style={{
                    background: "red",
                    color: "white",
                    padding: "5px",
                    margin: "5px",
                  }}
                >
                  Confirm
                </button>
                <button
                  style={{
                    background: "green",
                    color: "white",
                    padding: "5px",
                    margin: "5px",
                  }}
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                
              </div>
              
            </div>
            
          </div>
          
        </div>
        
      )}
      <ToastContainer />
    </>
    
  );
}

export default Sidebar;
