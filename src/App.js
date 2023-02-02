import logo from './logo.svg';
import './App.css';
import './Components/Review';
import './Components/LoginPage';
import './Components/NavBar';
import './Components/ProfilePage';
import './Components/BrowseBooksPage';
import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from './Components/LoginPage';
import NavBar from './Components/NavBar';

function App() {

 
  const [user, setUser] = useState(null)
    
  return (
    <>
    <h1>Do Robots Read About Electric Sheep</h1>
  
    <NavBar></NavBar>
    <Routes>
    <Route path="/" element = {user? <h1>WELCOME {user.name}</h1> : <h1>WELCOME</h1>}/>
    <Route path="/books" element = {<BrowseBooksPage/>}/>
    <Route path="/profile" element = {<ProfilePage user={user}/>}/>

    <Route path="/login" element = { <LoginPage setUser={setUser}></LoginPage> } />
    
    </Routes>
    </>
  );
}

export default App;
