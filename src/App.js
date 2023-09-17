import './App.css';
import {  BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import LoginForm from './Components/LoginForm';
import Admin from './Pages/Admin';
import SignUp from './Components/SignUp';
import ElectionForm from './Components/ElectionForm';
import VoterPage from './Pages/VoterPage';
import CandidatePage from './Pages/CandidatePage';
import Vote from './Pages/Vote';


function App() {
  // var navigate = useNavigate();
  const authtoken = localStorage.getItem("authToken") ;
  const userEmail =  localStorage.getItem("UserEmail");
  const adminEmail =  localStorage.getItem("AdminEmail");
  // console.log("sasas",authtoken);
  return (
    <div className="App">
    <Router>  
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/loginAdmin" element={<LoginForm temp={1}/>}></Route>
        <Route exact path="/loginUser" element={<LoginForm temp={2}/>}></Route>
        <Route exact path="/signUp" element={<SignUp/>}></Route>
        <Route path="/adminPage" element={<Admin/>}></Route>
        <Route path="/electionForm" element={<ElectionForm/>}></Route>
        <Route exact path="/voterPage" element={<VoterPage/>}></Route>
        <Route exact path="/candidatePage" element={<CandidatePage/>}></Route>
        <Route exact path="/votepage" element={<Vote/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;