import React from 'react'
import{Link} from 'react-router-dom'
const SignUp = ()=>{
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2 className="brand-logo">Instagram</h2>
                <input type="email" placeholder="Enter Email ..."></input>
                <input type="password" placeholder="Enter Password ..."></input>
                <input type="password" placeholder="Confirm Password ..."></input>
                <button className="btn waves-effect waves-light">SignUp
                </button>
                <h5>
                    <Link to="/login" > Already have an account? SigIn </Link>
                </h5>
                
            </div>
         
        </div>
            
    )
}
export default SignUp;