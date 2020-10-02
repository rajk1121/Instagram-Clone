import React, { useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
const LogIn = ()=>{
    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)
    // if(props.isLogged){
    //     history.push('/')
    //     // return
    // }
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    function request(){
        fetch('/auth/login?email='+email+"&password="+password,{
            method : "get"
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data)
            if(data.message=="Login Successfull"){
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({type: "USER", payload : data.user})
                M.toast({html : data.message , classes : "green darken-1"})
                history.push('/')
            }else{
                M.toast({html : data.message , classes : "red darken-1"})
            }
        })
    }
    return (
       <div className="mycard">
           <div className="card auth-card">
           <h2 className="brand-logo">LogIn</h2>
           <input type="email" placeholder="Enter Email ..."
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           ></input>
           <input type="password" placeholder="Enter Password ..."
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
           ></input>
           <button className="btn waves-effect blue darken-1" onClick={request}>LogIn
            </button>
       </div>
            
       </div>
    )
}
export default LogIn;