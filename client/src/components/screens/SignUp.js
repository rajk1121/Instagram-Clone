import React, { useEffect } from 'react'
import{Link, useHistory} from 'react-router-dom'
import{useState} from 'react'
import M from 'materialize-css'
const SignUp = (props)=>{
    const history = useHistory()
    // if(props.isLogged){
    //     history.push('/')
    //     // return
    // }
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [file, setFile] = useState()
    const [url, setUrl] = useState()
    const [password, setPassowrd] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const[isLoading, setLoading] = useState(false)
    useEffect(()=>{
        if(url){
            fetch('/auth/signUp',{
                method: "post",
                headers:{
                    "Content-type": "application/json"
                },
                body : JSON.stringify({
                    Name: name,
                    email : email,
                    password :password,
                    confirmPassword : confirmPassword,
                    url : url
                })
            }).then(res=>res.json())
            .then((data)=>{
                if(data.message == "Successfull"){
                    M.toast({html : data.message , classes : "green darken-1"})
                    history.push('/login')
                }else{
                    M.toast({html : data.message , classes : "red darken-1"})
                    
                }
                setLoading(false)
            })
        }
    }, [url])
    const request = ()=>{
        setLoading(true)
        const fileData = new FormData()
        fileData.append("file", file)
        fileData.append("upload_preset", "inst-clone")
        fileData.append("cloud_name", "duhj89kch")
        fetch('https://api.cloudinary.com/v1_1/duhj89kch/image/upload',{
            method:"post",
            body : fileData
        }).then(res=>res.json())
        .then((data)=>{
            // console.log(data)
            setUrl(data.url)
            
        }).catch((err)=>{
            setLoading(false)
            // console.log(err)
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2 className="brand-logo">Instagram</h2>
                <input type="text" placeholder="Enter Name ..." required
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ></input>
                <input type="email" placeholder="Enter Email ..."
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></input>
                <input type="password" placeholder="Enter Password ..."
                value={password}
                onChange={(e)=>setPassowrd(e.target.value)}
                ></input>
                <input type="password" placeholder="Confirm Password ..."
                value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                ></input>
                <div className="file-field input-field">
                <div className="btn">
                    <span>Profile Pic</span>
                    <input type="file"
                    onChange={e=>setFile(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            {
               isLoading ?
               <button className="btn waves-effect blue darken-1" disabled onClick={request}>Sign Up
            </button>
            : 
            <button className="btn waves-effect blue darken-1"  onClick={request}>Sign Up
            </button>
            }
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
                <h5>
                    <Link to="/login" > Already have an account? SigIn </Link>
                </h5>
                
            </div>
            <div className="card password-guideline">
                <h4> </h4>
                <ol>Password should - :
                    <li>Minimum length 8</li>
                    <li>Must have uppercase letters</li>
                    <li>Must have at least 2 digits</li>
                    <li>Should not have spaces</li>
                    <li>Should have atleast one symbol (@, !, $, %, &amp;, # etc.)</li>
                </ol>
            </div>
        </div>
            
    )
}
export default SignUp;