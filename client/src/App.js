import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/screens/Home'
import LogIn from './components/screens/LogIn'
import SignUp from './components/screens/SignUp'
import Profile from './components/screens/Profile'
import {BrowserRouter, Route} from 'react-router-dom'
function App() {
  return (
    <div>
      
    <Navbar />
    <BrowserRouter >
      <Route exact path='/'>
        <Home></Home>
      </Route>
      <Route path='/login'>
        <LogIn></LogIn>
      </Route>
      <Route path='/signup'>
        <SignUp></SignUp>
      </Route><Route path='/profile'>
        <Profile></Profile>
      </Route>
    </BrowserRouter >
    </div>
  );
}

export default App;
