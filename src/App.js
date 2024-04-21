import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calenderpage from './components/calendrierPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (   
  //<Home/> 
  //<Calenderpage/>
  <Router>
    <Routes>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path="/Calenderpage" element={<Calenderpage/>}/>
    </Routes>
  </Router>
  );
}

export default App;
