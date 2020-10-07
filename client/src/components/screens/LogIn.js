import React, { useState, useContext, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import LoginGoogle from '../GoogleLogin'
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
    const[isLoading, setLoading] = useState(false)
    useEffect(()=>{
      if(localStorage.getItem('user')){
        history.push('/')
  
      }
    }, [])
    function request(source, Email){
        setLoading(true)
        if(!source){
          source = "normal"
        }
        fetch('/auth/login?email='+(source=='google' ? Email : email)+"&password="+password+"&source="+source,{
            method : "get"
        }).then(res=>res.json())
        .then((data)=>{
            // console.log(data)
            if(data.message=="Login Successfull"){
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({type: "USER", payload : data.user})
                M.toast({html : data.message , classes : "green darken-1"})
                history.push('/')
            }else{
                M.toast({html : data.message , classes : "red darken-1"})
            }
            
            setLoading(false)
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
           {
               isLoading ?
               <button className="btn waves-effect blue darken-1" disabled onClick={request}>LogIn
            </button>
            : 
            <button className="btn waves-effect blue darken-1"  onClick={request}>LogIn
            
            </button>
            }
            <LoginGoogle call={request}></LoginGoogle>
            {
                isLoading ? 
                <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
          
                <div class="spinner-layer spinner-red">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
          
                <div class="spinner-layer spinner-yellow">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
          
                <div class="spinner-layer spinner-green">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
            
                :
                <div></div>
            }
       </div>
            
       </div>
    )
}
export default LogIn;