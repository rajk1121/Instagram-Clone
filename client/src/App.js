import React , {useEffect, useContext, createContext, useReducer} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/screens/Home'
import LogIn from './components/screens/LogIn'
import SignUp from './components/screens/SignUp'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/createPost'
import OtherProfile from './components/screens/otherProfile'
import AcceptReject from './components/screens/AcceptReject'
import {initialState,reducer} from './reducres/userReducer'
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
export const UserContext = createContext()
const Router = ()=>{
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  // console.log(state)
  useEffect(()=>{
    // console.log("dnoded")
    if(localStorage.getItem('user')){
      // console.log("local")
      dispatch({type : "USER", payload : JSON.parse(localStorage.getItem('user'))})
      history.push('/')
    }else{
      history.push('/login')
    }
  }, [])
  return (
      <Switch>
          <Route exact path='/'>
          <Home></Home>
        </Route>
        <Route path='/login'>
          <LogIn></LogIn>
        </Route>
        <Route path='/signup'>
          <SignUp></SignUp>
        </Route>
        <Route path='/show/:userId'>
          <OtherProfile></OtherProfile>
        </Route>
        <Route path='/profile'>
          <Profile></Profile>
        </Route>
        <Route path='/createPost'>
          <CreatePost></CreatePost>
        </Route>
        <Route path='/AcceptReject'>
          <AcceptReject></AcceptReject>
        </Route>
      </Switch>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  // console.log(state)
  return (
    // <div>
    <UserContext.Provider value={{state, dispatch}}>
        
      <BrowserRouter >
        <Navbar />
        <Router />
        <Footer/>
      </BrowserRouter >
    </UserContext.Provider>
    // </div>
  );
}

export default App;
