import React, { useState } from 'react'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { connect, useDispatch, useSelector } from "react-redux";
import * as actionTypes from '../reducers/actionTypes';
import { ToastContainer,toast } from "react-toastify";
import connexion from "../assets/images/connexion.jpg";  

const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();


  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
  });
  const login = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axiosInstance.post(
        "/login",
        formData, // Ajoutez les données à envoyer
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        user: response.data.id,
      });
      console.log("response", response);

    } catch (err) {
      console.log(err);

      toast.error('Please verify your data.');
    }
  };

  return (
    <div className="login">
    <div className="login-container">
        {/* -------------- image --------------------- */}
        <div className="login-img">
            <img src={connexion} alt="" />
        </div>
        {/* -------------form--------------------- */}
        <div className="login-all-content">
            <div className="login-content">
                <div className="login-logo">
                    <img src="https://app.diggow.com/static/media/Slice1.68f697e8434b8cfbbdb67c6001ea39bc.svg" alt="" />
                    <h3>diggow</h3>
                </div>
                <div className="login-welcome">
                    <h2>Log in</h2>
                    <p>Please enter your credentials to log in. If you are not a member, please create an account.</p>
                </div>
              
                <div className="login-input">
                    <label name="email">Professional emaill</label>
                    <input type="text"
                    
                    onChange={(event) => setEmail(event.target.value)}

                    placeholder='Name@email.com' />
                </div>
                <div className="login-input">
                    <label name="password">Password</label>
                    <input type="password" 
                    
                    onChange={(event) => setPassword(event.target.value)}

                    />
                  
                </div>
            <br/>
            <div className="login-button">
                <button onClick={login}>Log In</button>
            </div>
            <div className="move-to-register">
            <h5>Already have an account?</h5>
              
                    <button onClick={()=>navigate('/register')}>Sign Up</button>
            
            </div>
        </div>
    </div>
            </div>       <ToastContainer />

            </div>
  )
}

export default Login






