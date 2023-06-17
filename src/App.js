import logo from './logo.svg';
import './App.css';
import {  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import LoginForm from './Components/LoginForm';
import Admin from './Pages/Admin';
import SignUp from './Components/SignUp';
import Elections from './Pages/Elections';
import Nominee from './Pages/Nominee';


function App() {
  return (
    <div className="App">
    <Router>  
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/loginAdmin" element={<LoginForm temp={1}/>}></Route>
        <Route exact path="/loginNominee" element={<LoginForm temp={2}/>}></Route>
        <Route exact path="/loginVoter" element={<LoginForm temp={3}/>}></Route>

        <Route exact path="/signUp" element={<SignUp/>}></Route>
        <Route exact path="/nominee" element={<Nominee/>}></Route>
        <Route exact path="/election" element={<Elections/>}></Route>
        
        <Route exact path="/adminPage" element={<Admin/>}></Route>
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
