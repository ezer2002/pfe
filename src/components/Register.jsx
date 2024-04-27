import React from 'react'
import '../styles/register.css'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <>
    <div className="register">
        <div className="register-container">
            {/* -------------- image --------------------- */}
            <div className="register-img">
                <img src="https://app.diggow.com/static/media/body_register.ef5486fd628fc4c8bc5c.png" alt="" />
            </div>
            {/* -------------form--------------------- */}
            <div className="register-all-content">
                <div className="register-content">
                    <div className="register-logo">
                        <img src="https://app.diggow.com/static/media/Slice1.68f697e8434b8cfbbdb67c6001ea39bc.svg" alt="" />
                        <h3>diggow</h3>
                    </div>
                    <div className="register-welcome">
                        <h2>Bienvenue !</h2>
                        <p>Créez votre espace client et profitez de ses avantages pour gérer vos pages en toute simplicité !</p>
                    </div>
                    <div className="register-input">
                        <label name="name">Nom</label>
                        <input type="text" />
                    </div>
                    <div className="register-input">
                        <label name="email">Email</label>
                        <input type="text" placeholder='Nom@email.com' />
                    </div>

                    <div className="register-input">
                        <label name="societe">Société</label>
                        <input type="text" />
                    </div>
                    <div className="register-input">
                        <label name="telephone">Téléphone</label>
                        <input type="number" />
                    </div>
                    <div className="register-input">
                        <label name="password">Mot de passe</label>
                        <input type="password" />
                      
                    </div>
                    <div className="register-input">
                        <label name="confirm-password">Confirmer mot de passe</label>
                        <input type="password" />
                </div>
                <div className="password-exclamation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                    </svg>

                <p>Pour votre mot de passe , veuillez choisor au minimum 8 caratéres dont un chiffre, un caractére spécial.</p>
                </div>
                <div className="register-button">
                    <button>Se connecter</button>
                </div>
                <div className="move-to-login">
                <h5>Vous avez déja un compte ?</h5>
                    <Link to='/login'>Connectez-vous</Link>
                </div>
            </div>
        </div>
                </div> 
                </div>
           </>
  )
}

export default Register