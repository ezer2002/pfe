import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calenderpage from './components/calendrierPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (   
  //<Home/> 

  /*<Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/post/:eventId" element={<Home />} />
      <Route exact path="/calendar" element={<Calenderpage />} />
    </Routes>
  </Router>*/
  <>
    
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/calendar" element={<Calenderpage/>} />
        <Route path="/" element={<Home />} />

      </Routes>
  </>
  );
}

export default App;
