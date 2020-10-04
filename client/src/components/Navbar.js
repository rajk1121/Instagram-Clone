import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'
import {useHistory} from 'react-router-dom'
import SearchModal from './searchModal'
import M from 'materialize-css'
const Navbar = ()=>{
  const history = useHistory()
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });

  const {state, dispatch} = useContext(UserContext)
  console.log(state)
  const logout = ()=>{
    localStorage.clear()
    dispatch({type:"CLEAR"})
    history.push('/login')
  }
    if(state){
      return (
        <div>
          <nav>
              <div className="nav-wrapper">
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                
                  <Link to="/" className="brand-logo left hide-on-med-and-down">Instagram</Link>
                <ul id="" className="right hide-on-med-and-down">
                  <li><SearchModal></SearchModal></li>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                  <button className="btn waves-effect red darken-1" onClick={logout}>LogOut
                  </button>
                  <li><Link to="/createPost">Create Post</Link></li>
                </ul>
              </div>
            </nav>
            <ul class="sidenav" id="mobile-demo">
              <li><SearchModal></SearchModal></li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/createPost">Create Post</Link></li>
              <li><button className="btn waves-effect red darken-1"  style={{marginLeft : "2rem"}} onClick={logout}>LogOut
                    </button></li>
          </ul>
        </div>
            
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