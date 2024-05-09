import React, { useState,useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io5";
import logo from "../../assets/images/Innovation page.png";
import { SlCalender } from "react-icons/sl";
import "../../styles/sidebar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";

function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [Mobile, setMobile] = useState(false);
  const [selected, setSelected] = useState(false);
  const [pages,setPages]=useState([])
  const toggleSelected = () => {
    setSelected(!selected);
  };
  const [nompage, setNomPage] = useState();
  const [pageId, setPageId] = useState(false);
  const [accessToken, setAccessToken] = useState();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  const [showpopup, setshowpopup] = useState(false);

  const togglePopup = () => {
    setshowpopup(!showpopup);
  };
  const add =async ()=>{
    try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/addpagesociaux",
      {
        page_name: nompage,
        page_id: pageId,

        access_token: accessToken,

      }  );
      
      console.log("add")
    setshowpopup(false)
    } catch (err) {
          console.log("err")
      }
      get()
   
  }
  useEffect(() => {
    get()
  }, [])
  
  const deletepage =(id)=>{
    console.log(id)
    axios.delete('http://127.0.0.1:8000/api/pages/' + id)
    .then(response => {
        console.log(response.data.message);
        get()
        // Actualiser la liste des pages ou effectuer d'autres actions après la suppression
    })

    .catch(error => {
        console.error('Error deleting page:', error);
    });
  }
  const get =async ()=>{
    try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/getAllpage",
   );
      setPages(response.data)
    console.log(response.data)
    } catch (err) {
          console.log("err")
      }

   
  }

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
        <li class="sidebar-item" >
                <a 
                
                     class="sidebar-link collapsed"
                     data-bs-toggle="collapse"
                     data-bs-target="#add"
                     aria-expanded="false"
                     aria-controls="add"
               style={{color:"blue",cursor:"pointer"}}   onClick={() => setshowpopup(true)}>
{/* 
                  <span className="icon-mini-menu ">A</span> */}
                     
                    <IoIosAddCircleOutline size={20}    />    
                    <span>     Ajouter une page    </span>

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
          
          {pages.map(page => (
        <li key={page.id} className="sidebar-item">
            <a href="#" className="sidebar-link">
                <span className="icon-mini-menu">{page.page_name.charAt(0)}</span>
                {page.page_name}
                <MdOutlineDeleteOutline onClick={() => deletepage(page.id)} size={20} className="ms-5" cursor={'pointer'}/>

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
              <IoLogoLinkedin size={20} color="blue"  />
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
        {showpopup && (
            <div className="popup">
              <div className="popup-content">
                <button className="close-button" onClick={togglePopup}>
                  ×
                </button>

                <div className="input-list">
                <div className="page-input ">
                <label name="email">Nom du page</label>
                    <input type="text"
                    
                    onChange={(event) => setNomPage(event.target.value)}

                     />
                    </div>
                    <div className="page-input">
                <label name="email">Pga id</label>
                    <input type="text"
                    
                    onChange={(event) => setPageId(event.target.value)}

                     />
                    </div>
                    <div className="page-input">
                <label name="email">Access token</label>
                    <input type="text"
                    
                    onChange={(event) => setAccessToken(event.target.value)}

                     />
                    </div>
                    <div className="ajouter-button">
                <button onClick={add} >Ajouter</button>
            </div>
                </div>
              </div>
            </div>
          )}
      </aside>
  </>
 )
}

export default Sidebar