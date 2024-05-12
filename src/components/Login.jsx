import React, { useState } from 'react'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { connect, useDispatch, useSelector } from "react-redux";
import * as actionTypes from '../reducers/actionTypes'
import { ToastContainer,toast } from "react-toastify";

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

      toast.error('verifier vos données .');

    }
  };







  return (
    <div className="login">
    <div className="login-container">
        {/* -------------- image --------------------- */}
        <div className="login-img">
            <img src="https://app.diggow.com/static/media/body_login.014d5cf69aa6a0e24ea4.png" alt="" />
        </div>
        {/* -------------form--------------------- */}
        <div className="login-all-content">
            <div className="login-content">
                <div className="login-logo">
                    <img src="https://app.diggow.com/static/media/Slice1.68f697e8434b8cfbbdb67c6001ea39bc.svg" alt="" />
                    <h3>diggow</h3>
                </div>
                <div className="login-welcome">
                    <h2>Se connecter</h2>
                    <p>Veuillez saisir vos identifiants afin de vous connecter. Si vous n'étes pas un membre, veuillez créer un compte</p>
                </div>
              
                <div className="login-input">
                    <label name="email">Email professionnel</label>
                    <input type="text"
                    
                    onChange={(event) => setEmail(event.target.value)}

                    placeholder='Nom@email.com' />
                </div>
                <div className="login-input">
                    <label name="password">Mot de passe</label>
                    <input type="password" 
                    
                    onChange={(event) => setPassword(event.target.value)}

                    />
                  
                </div>
            <div className="save-password">
                <input type="checkbox" checked name="" id="" />
                <h4>Se souvenir de moi</h4>
            </div>
            <div className="forgot-password">
            <p>Mot de passe oublié?</p>
            </div>
            <div className="login-button">
                <button onClick={login}>Se connecter</button>
            </div>
            <div className="move-to-register">
            <h5>Vous avez déja un compte ?</h5>
              
                    <button onClick={()=>navigate('/register')}>Inscriver-vous</button>
            
            </div>
        </div>
    </div>
            </div>       <ToastContainer />

            </div>
  )
}

export default Login