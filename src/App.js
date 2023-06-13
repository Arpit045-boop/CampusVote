import logo from './logo.svg';
import './App.css';
import {  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import LoginForm from './Components/LoginForm';
import Admin from './Pages/Admin';
import SignUp from './Components/SignUp';


function App() {
  return (
    <div className="App">
    <Router>  
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/login" element={<LoginForm/>}></Route>

        <Route exact path="/signUp" element={<SignUp/>}></Route>
        
        <Route exact path="/adminPage" element={<Admin/>}></Route>
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
