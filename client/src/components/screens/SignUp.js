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
    useEffect(()=>{
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
        })
    }, [url])
    const request = ()=>{
        const fileData = new FormData()
        fileData.append("file", file)
        fileData.append("upload_preset", "inst-clone")
        fileData.append("cloud_name", "duhj89kch")
        fetch('https://api.cloudinary.com/v1_1/duhj89kch/image/upload',{
            method:"post",
            body : fileData
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data)
            setUrl(data.url)
            
        }).catch((err)=>{
            console.log(err)
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
                    <span>File</span>
                    <input type="file"
                    onChange={e=>setFile(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
                <button className="btn waves-effect blue " onClick={request}>SignUp
                </button>
                <h5>
                    <Link to="/login" > Already have an account? SigIn </Link>
                </h5>
                
            </div>
         
        </div>
            
    )
}
export default SignUp;