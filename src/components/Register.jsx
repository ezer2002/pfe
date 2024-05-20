import React, { useState } from "react";
import "../styles/register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import * as actionTypes from '../reducers/actionTypes'
import {  useNavigate } from 'react-router-dom'
import { connect, useDispatch, useSelector } from "react-redux";
import { ToastContainer,toast } from "react-toastify";
import inscription from "../assets/images/inscription.jpg"; 

const Register = () => {
  const navigate=useNavigate()

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [Tel, setTelephone] = useState("");

  const [socite, setSocite] = useState("");
  
  const [confirmPassword, setConfirmPassword] = useState("");

  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const register = async (e) => {
    e.preventDefault();
    if(password!=confirmPassword){
      toast.error('Invalid password.');

    }else{

    
    if(name.trim()==""||email.trim()==""||Tel.trim()==""||socite.trim()==""||password.trim()==""){
      toast.error('Please verify your data.');
    }
    else{

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("tel", Tel);
    formData.append("socite", socite);

    try {
      //axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData, // Ajoutez les données à envoyer
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate('/login')
      console.log("response", response);
    } catch (err) {
      console.log('eroor')
      toast.error("verifier vos données .",err);

    }    } }
  };

  return (
    <>
      <div className="register">
       
        <div className="register-container">
          {/* -------------- image --------------------- */}
          <div className="register-img">
            <img
              src={inscription}
              alt=""
            />
          </div>
          {/* -------------form--------------------- */}
          <div className="register-all-content">
            <div className="register-content">
              <div className="register-logo">
                <img
                  src="https://app.diggow.com/static/media/Slice1.68f697e8434b8cfbbdb67c6001ea39bc.svg"
                  alt=""
                />
                <h3>diggow</h3>
              </div>
              <div className="register-welcome">
                <h2>Welcome!</h2>
                <p>
                Create your customer space and enjoy its benefits to manage your pages with ease!
                </p>
              </div>
              <div className="register-input">
                <label name="name">Name</label>
                <input
                  type="text"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="register-input">
                <label name="email">Email</label>
                <input
                  type="email"
                  placeholder="Name@email.com"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="register-input">
                <label name="societe">Société</label>
                <input type="text"  onChange={(event) => setSocite(event.target.value)}  />
              </div>
              <div className="register-input">
                <label name="telephone">Téléphone</label>
                <input type="number"    onChange={(event) => setTelephone(event.target.value)}  />
              </div>
              <div className="register-input">
                <label name="password">Password</label>
                <input
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="register-input">
                <label name="confirm-password">Confirm Password</label>
                <input type="password"        onChange={(event) => setConfirmPassword(event.target.value)}/>
              </div>
              <div className="password-exclamation">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-exclamation-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                </svg>

                <p>
                For your password, please choose at least 6 characters.
                </p>
              </div>
              <div className="register-button">
                <button onClick={register}>Sign In</button>
              </div>
              <div className="move-to-login">
                <h5>Already have an account?</h5>
                <Link to="/login">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;