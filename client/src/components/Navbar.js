import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'
import {useHistory} from 'react-router-dom'
const Navbar = ()=>{
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  console.log(state)
  const logout = ()=>{
    localStorage.clear()
    dispatch({type:"CLEAR"})
    history.push('/login')
  }
    if(state){
      return (
        <nav>
        <div className="nav-wrapper">
          <Link to="#" className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <button className="btn waves-effect red darken-1" onClick={logout}>LogOut
            </button>
            <li><Link to="/createPost">Create Post</Link></li>
          </ul>
        </div>
      </nav>
            
    )
    }else{
      return (
        <nav>
        <div className="nav-wrapper">
          <Link to="#" className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right">
            <li><Link to="/login">LogIn</Link></li>
            <li><Link to="/signup">SignUp</Link></li>
            {/* <li><Link to="/profile">Profile</Link></li> */}
              
          </ul>
        </div>
      </nav>
            
    )
    }
}
export default Navbar;