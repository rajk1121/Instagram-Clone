import React,{useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'
import {useHistory} from 'react-router-dom'
import SearchModal from './searchModal'
import M from 'materialize-css'
const Navbar = ()=>{
  const history = useHistory()
  
  useEffect(()=>{
    // document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      // console.log(elems)
      var instances = M.Sidenav.init(elems, {});
    
  }, [])

  const {state, dispatch} = useContext(UserContext)
  // console.log(state)
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
                  <Link to="/" className="brand-logo center hide-on-large">Instagram</Link>
                  <ul style={{margin : "0 20px"}} className="right">
                  <li><SearchModal ></SearchModal></li>
                  </ul>
                <ul  id="" className="right hide-on-med-and-down">
                {/* <li><SearchModal className="right"></SearchModal></li> */}
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                  <button className="btn waves-effect red darken-1" onClick={logout}>LogOut
                  </button>
                  <li><Link to="/createPost">Create Post</Link></li>
                  <li><Link to="/AcceptReject">Pending Requests</Link></li>
                </ul>
                
              </div>
            </nav>
            <ul  id="mobile-demo" className="sidenav">
              {/* <li><SearchModal></SearchModal></li> */}
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/createPost">Create Post</Link></li>
              <li><Link to="/AcceptReject">Pending Requests</Link></li>
              <li><button className="btn waves-effect red darken-1"  style={{marginLeft : "2rem"}} onClick={logout}>LogOut
                    </button></li>
          </ul>
        </div>
            
    )
    }else{
      return (
        <div>
          <nav>
              <div className="nav-wrapper">
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                
                  <Link to="/" className="brand-logo left hide-on-med-and-down">Instagram</Link>
                  <Link to="/" className="brand-logo center hide-on-large">Instagram</Link>
                  
                <ul  id="" className="right hide-on-med-and-down">
                {/* <li><SearchModal className="right"></SearchModal></li> */}
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
                </ul>
                
              </div>
            </nav>
            <ul  id="mobile-demo" className="sidenav">
              {/* <li><SearchModal></SearchModal></li> */}
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
            
    )
    }
}
export default Navbar;